import { useSelector, useDispatch } from "react-redux";
import SidePost from "../SidePost";
import { useEffect } from "react";
import { getTrendingPosts } from "../../features/Posts/postsSlice";
import SidePostSkeleton from "../SidePostSkeleton";

const SideBar = ({ start, end, title }) => {
  const { trendingPosts, trendingPostsIsLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // fetch the trending posts when the component mounts

  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);

  const placeholders = Array.from({ length: Math.max(1, (end ?? 0) - (start ?? 0)) });

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-8">
        {title} Posts
      </h2>
      <div className="grid grid-cols-1 gap-4 justify-center items-center">
        {trendingPostsIsLoading || trendingPosts.length === 0
          ? placeholders.map((_, idx) => <SidePostSkeleton key={`sk-${idx}`} />)
          : trendingPosts.slice(start, end).map((post) => (
              <SidePost post={post} key={post._id} />
            ))}
      </div>
    </div>
  );
};

export default SideBar;
