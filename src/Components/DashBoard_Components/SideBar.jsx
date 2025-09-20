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
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-8">
        {title} Posts
      </h2>
      <div className="grid grid-cols-1 gap-4 justify-center items-center">
        {trendingPosts.slice(start, end).map((post) => (
          <SidePost post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
