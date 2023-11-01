import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Restaurant } from "../../interfaces/Restaurant";
import CartLoading from "../../components/CardLoading";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatcher = useAppDispatch();
  const navigation = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    await axiosPrivate.get("/auth/logout");
    dispatcher(logOut());
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axiosPrivate("/restaurants");

        setRestaurants(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <header className="flex flex-row justify-between p-2">
        <ul className="flex flex-row gap-2">
          <li className="font-bold text-lg cursor-pointer">KEN FOOD</li>

          <li>
            <button
              onClick={() => {
                navigation("../linkpage");
              }}
              className="text-black p-1 rounded-md ml-5"
            >
              link page
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigation("../admin");
              }}
              className="text-black p-1 rounded-md ml-5 bg-orange-300 "
            >
              จัดการ
            </button>
          </li>
        </ul>
        <div className="">
          <button
            onClick={signOut}
            className="bg-yellow-400 p-2 rounded-md text-white hover:bg-yellow-200"
          >
            logout
          </button>
        </div>
      </header>
      <section className="p-2">
        <div className="grid grid-rows-4 grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {isLoading ? (
            <>
              <CartLoading />
              <CartLoading />
              <CartLoading />
              <CartLoading />
              <CartLoading />
              <CartLoading />
            </>
          ) : (
            restaurants.map((item) => (
              <div key={item.id} className="p-2 bg-neutral-50 rounded-sm">
                <img src={item.imageUrl} className="mb-2 rounded-md" alt="" />
                <h6>{item.name}</h6>
                <h2>{item.type}</h2>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
