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
        className="w-full xl:w-[1200px] relative flex flex-col lg:flex-row justify-between mx-auto my-10"
        style={{ color: textColor }}
      >
        {/* Main Content */}
        <div className="w-full lg:w-[69%] h-full flex flex-col gap-5 p-5">
          <Post id={id} />

          {/* Comments Section */}
          <MakeComments />
        </div>

        {/* Side Bar */}
        <div className="w-full lg:w-[29%] h-[100%] rounded-lg flex flex-row lg:flex-col flex-wrap justify-center gap-10 p-5">
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
