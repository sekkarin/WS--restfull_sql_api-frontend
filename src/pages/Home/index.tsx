import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Restaurant } from "../../interfaces/Restaurant";

// type Props = {};

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatcher = useAppDispatch();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.get("/auth/logout");
  };
  useEffect(() => {
    (async () => {
      const res = await axiosPrivate("/restaurants");
      // console.log(res.data);
      setRestaurants(res.data);
    })();
  }, []);
  return (
    <>
      <header className="flex flex-row justify-between p-2">
        <ul className="flex flex-row gap-2">
          <li className="font-bold text-lg">KEN FOOD</li>
          <li>
            <button
              // onClick={signOut}
              className="bg-green-400 p-1 rounded-md text-white ml-5 hover:bg-green-300"
            >
              เพิ่มรายการ
            </button>
          </li>
          {/* <li>3</li> */}
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
      <section className="">
        <div className="grid grid-rows-4 grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {restaurants.map((item) => (
            <div key={item.id} className="p-2 bg-neutral-50 rounded-sm">
              <img src={item.imageUrl} className="mb-2 rounded-md" alt="" />
              <h6>{item.name}</h6>
              <h2>{item.type}</h2>
              <button className="bg-red-500 rounded-md p-2 mt-2 mr-1">
                ลบ
              </button>
              <button className="bg-yellow-400 rounded-md p-2">แก้ใข</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
