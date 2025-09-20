import Header from "../Components/Header/Header.jsx";
import Hero from "../Components/DashBoard_Components/Hero";
import { useSelector } from "react-redux";
import SideBar from "../Components/DashBoard_Components/SideBar";
import NewestPosts from "../Components/DashBoard_Components/NewestPosts";
import SEO from "../Components/SEO";
import AdsterraAd from "../Components/AdsterraAd";
import AdsterraPopunder from "../Components/AdsterraPopunder";

const Dashboard = () => {
  const { textColor } = useSelector((state) => state.color.colors);

  return (
    <>
      <SEO
        title="IntraVerse - Dashboard"
        description="Welcome to IntraVerse, your go-to platform for the latest articles and insights. Explore trending and popular posts, and stay updated with the newest content."
        keywords="IntraVerse, articles, trending posts, popular posts, latest insights, blog, news"
      />
      <Header />
      <div
        className="w-full lg:p-0 xl:w-[1200px] relative flex flex-col lg:flex-row justify-between mx-auto my-6 md:my-10 gap-6"
        style={{ color: textColor }}
      >
        {/* Main Content */}
        <div className="w-full lg:w-[69%] h-full flex flex-col gap-6 p-4 md:p-5">
          <Hero />
          <NewestPosts />
        </div>

        {/* Side Bar */}
        <div className="w-full lg:w-[29%] h-full rounded-lg flex flex-wrap flex-row lg:flex-col gap-6 p-4 md:p-5">
          <SideBar start={0} end={4} title={"Trending"} />
          <AdsterraAd />
          <AdsterraPopunder />
          <SideBar start={4} end={8} title={"Popular"} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
