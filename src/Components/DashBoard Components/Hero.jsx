import heroImage from "../../assets/hero.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getTrendingPosts } from "../../features/Posts/postsSlice.js";
import { useEffect } from "react";

const Hero = () => {
  const { trendingPosts, isLoading, isError } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <>
      <div className="w-[1200px] relative flex items-center justify-between mx-auto my-10">
        {/* Main Content */}
        <div className=" w-[69%] h-full">
          {trendingPosts.length > 0 ? (
            trendingPosts.map((post) => (
              <div key={post._id} className="p-4 border-b border-gray-300 bg-amber-100">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
              </div>
            ))
          ) : (
            <div>No trending posts available.</div>
          )}
        </div>

        {/* Side Bar */}
        <div className="bg-blue-500 w-[29%] h-[100%]">nk</div>
      </div>
    </>
  );
};

export default Hero;
