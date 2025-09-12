import { useSelector, useDispatch } from "react-redux";
import SidePost from "../SidePost";
import { useEffect } from "react";
import { getTrendingPosts } from "../../features/Posts/postsSlice";

const SideBar = ({ start, end, title }) => {
  const { trendingPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // fetch the trending posts when the component mounts

  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-7 ">
        {title} Posts
      </h2>
      {trendingPosts.slice(start, end).map((post) => (
        <SidePost post={post} key={post._id} />
      ))}
    </div>
  );
};

export default SideBar;
