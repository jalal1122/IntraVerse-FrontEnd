import { useParams } from "react-router";
import Header from "../Components/Header/Header";
import { useSelector } from "react-redux";
import Post from "../Components/Post Details_Components/Post";
import SideBar from "../Components/DashBoard_Components/SideBar";
import Comments from "../Components/Post Details_Components/Comments";
import MakeComments from "../Components/Post Details_Components/MakeComments";
import AdsterraAd from "../Components/AdsterraAd";
import AdsterraPopunder from "../Components/AdsterraPopunder";

const PostDetails = () => {
  // get the id from the params
  const { id } = useParams();

  // get the text color from the redux store
  const { textColor } = useSelector((state) => state.color.colors);

  return (
    <div>
      <Header />

      <div
        className="w-full xl:w-[1200px] relative flex flex-col lg:flex-row justify-between mx-auto my-6 md:my-10 gap-6"
        style={{ color: textColor }}
      >
        {/* Main Content */}
        <div className="w-full lg:w-[69%] h-full flex flex-col gap-6 p-4 md:p-5">
          <Post id={id} />

          {/* Comments Section */}
          <MakeComments />
        </div>

        {/* Side Bar */}
        <div className="w-full lg:w-[29%] h-full rounded-lg flex flex-row lg:flex-col flex-wrap justify-center items-center gap-6 p-4 md:p-5">
          <SideBar start={0} end={2} title={"Trending"} />
          <AdsterraAd />
          <AdsterraPopunder />
          <SideBar start={2} end={4} title={"Popular"} />

          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
