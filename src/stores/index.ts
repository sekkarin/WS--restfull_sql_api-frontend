import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import registerReducer from "./slices/registerSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["register", "cart"],
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // register: registerReducer,
  // cart: cartReducer,
  // [apiSlice.reducerPath] :apiSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
