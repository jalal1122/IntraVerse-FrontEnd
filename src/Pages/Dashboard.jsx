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
        <div className="w-[29%] h-[100%] rounded-lg flex flex-col gap-10">
          <SideBar start={0} end={4} title={"Trending"} />
          <SideBar start={4} end={8} title={"Popular"} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
