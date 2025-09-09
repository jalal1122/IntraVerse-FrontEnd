import { useSelector, useDispatch } from "react-redux";
import { getTrendingPosts, reset } from "../../features/Posts/postsSlice.js";
import { useEffect } from "react";
import Loader from "../Loader";
import SideBar from "./SideBar";

const Hero = () => {
  // get the trending posts from the Redux store
  const { trendingPosts, isLoading, isError, isSuccess } = useSelector(
    (state) => state.posts
  );

  // get the colors from the redux store
  const { textColor, bgColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    dispatch(getTrendingPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <>
      {trendingPosts[2] && (
        <div className="w-full h-[400px] rounded-lg relative overflow-hidden">
          <img
            src={trendingPosts[2].image}
            alt={trendingPosts[2].title}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
            <h3
              className="text-lg font-semibold  w-fit px-2 py-1"
              style={{ backgroundColor: primaryColor }}
            >
              Featured/{trendingPosts[2].category}
            </h3>
            <h2 className="text-3xl font-bold text-white">
              {trendingPosts[2].title}
            </h2>
            <p className=" mt-2 ml-3 text-white">
              {trendingPosts[2].createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
