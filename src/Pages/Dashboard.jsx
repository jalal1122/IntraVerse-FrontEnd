import Header from "../Components/Header/Header.jsx";
import Hero from "../Components/DashBoard Components/Hero";
import { useSelector } from "react-redux";
import SideBar from "../Components/DashBoard Components/SideBar";
import NewestPosts from "../Components/DashBoard Components/NewestPosts";

const Dashboard = () => {
  const { textColor } = useSelector((state) => state.color.colors);

  return (
    <>
      <Header />
      <div
        className="w-[1200px] relative flex justify-between mx-auto my-10"
        style={{ color: textColor }}
      >
        {/* Main Content */}
        <div className=" w-[69%] h-full flex flex-col gap-5">
          <Hero />
          <NewestPosts />
        </div>

        {/* Side Bar */}
        <div className="w-[29%] h-[100%] border border-gray-300 rounded-lg">
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
