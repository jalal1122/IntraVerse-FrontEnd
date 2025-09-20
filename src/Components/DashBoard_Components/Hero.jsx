import { useSelector, useDispatch } from "react-redux";
import {
  getTrendingPosts,
  trendingPostsReset,
} from "../../features/Posts/postsSlice.js";
import { useEffect } from "react";
import Loader from "../Loader";
import { Link } from "react-router";

const Hero = () => {
  // get the trending posts from the Redux store
  const {
    trendingPosts,
    trendingPostsIsLoading,
    trendingPostsIsError,
    trendingPostsIsSuccess,
  } = useSelector((state) => state.posts);

  // get the colors from the redux store
  const { primaryColor } = useSelector((state) => state.color.colors);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trendingPostsIsSuccess) {
      dispatch(trendingPostsReset());
    }

    dispatch(getTrendingPosts());
  }, [dispatch]);

  if (trendingPostsIsLoading) {
    return <Loader />;
  }

  if (trendingPostsIsError) {
    return <div>Error: {trendingPostsIsError}</div>;
  }

  return (
    <>
      {trendingPosts[0] && (
        <div className="w-full h-[240px] sm:h-[320px] md:h-[420px] rounded-xl relative overflow-hidden group">
          <Link to={`/post/${trendingPosts[0]._id}`}>
            <img
              src={trendingPosts[0].image}
              alt={trendingPosts[0].title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
            <h3
              className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide w-fit px-2 py-1 rounded"
              style={{ backgroundColor: primaryColor }}
            >
              Featured/{trendingPosts[0].category}
            </h3>
            <Link to={`/post/${trendingPosts[0]._id}`}>
              <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {trendingPosts[0].title}
              </h2>
            </Link>
            <p className="mt-2 ml-1 sm:ml-2 text-white/90 text-sm sm:text-base">
              {trendingPosts[0].createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
