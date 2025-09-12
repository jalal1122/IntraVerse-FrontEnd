import { useParams } from "react-router";
import Header from "../Components/Header/Header";
import { useSelector } from "react-redux";
import Post from "../Components/Post Details_Components/Post";
import SideBar from "../Components/DashBoard_Components/SideBar";
import Comments from "../Components/Post Details_Components/Comments";
import MakeComments from "../Components/Post Details_Components/MakeComments";

const PostDetails = () => {
  // get the id from the params
  const { id } = useParams();

  // get the text color from the redux store
  const { textColor } = useSelector((state) => state.color.colors);

  return (
    <div>
      <Header />

      <div
        className="w-[1200px] relative flex justify-between mx-auto my-10"
        style={{ color: textColor }}
      >
        {/* Main Content */}
        <div className=" w-[69%] h-full flex flex-col gap-5">
          <Post id={id} />

          {/* Comments Section */}
          <MakeComments />
        </div>

        {/* Side Bar */}
        <div className="w-[29%] h-[100%] rounded-lg flex flex-col gap-10">
          <SideBar start={0} end={2} title={"Trending"} />
          <SideBar start={2} end={4} title={"Popular"} />

          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
