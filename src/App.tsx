import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LinkPage from "./pages/LinkPage";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import RegisterSuccess from "./pages/RegisterSuccess";
import RequireAuth from "./components/RequireAuth";
import { Roles } from "./enums/Rols";
// import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import UpdateRestaurant from "./pages/UpdateRestuarant";
import NewRestaurant from "./pages/NewRestuarant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerSuccess" element={<RegisterSuccess />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.USER, Roles.EDITOR, Roles.ADMIN]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        {/* <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.USER, Roles.EDITOR, Roles.ADMIN]}
            />
          }
        >
          <Route path="profile" element={<Profile />} />
        </Route> */}
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}
        >
          <Route path="updateRestuarant/:id" element={<UpdateRestaurant />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
          <Route path="newRestaurant" element={<NewRestaurant />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
