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
        <div className="w-[100%] h-[400px] rounded-lg relative overflow-hidden">
          <Link to={`/post/${trendingPosts[0]._id}`}>
            <img
              src={trendingPosts[0].image}
              alt={trendingPosts[0].title}
              className="w-full h-full object-cover object-center"
            />
          </Link>

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
            <h3
              className="text-lg font-semibold  w-fit px-2 py-1"
              style={{ backgroundColor: primaryColor }}
            >
              Featured/{trendingPosts[0].category}
            </h3>
            <Link to={`/post/${trendingPosts[0]._id}`}>
            <h2 className="text-3xl font-bold text-white">
              {trendingPosts[0].title}
            </h2>
            </Link>
            <p className=" mt-2 ml-3 text-white">
              {trendingPosts[0].createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
