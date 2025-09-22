import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, postsReset } from "../../features/Posts/postsSlice.js";
import { useEffect, useState } from "react";
import SidePost from "../SidePost";
import MainPost from "../MainPost.jsx";
import SidePostSkeleton from "../SidePostSkeleton";
import MainPostSkeleton from "../MainPostSkeleton";

const NewestPosts = () => {
  const dispatch = useDispatch();
  const { posts, postsIsLoading, postsIsError, postsIsSuccess } = useSelector(
    (state) => state.posts
  );

  const [firstPost, setFirstPost] = useState(null);

  const [firstLinePostGroup, setFirstLinePostGroup] = useState([]);

  const [secondLinePostGroup, setSecondLinePostGroup] = useState([]);

  const [eightPost, setEightPost] = useState(null);

  useEffect(() => {
    if (postsIsSuccess) {
      dispatch(postsReset());
    }
  }, [dispatch, postsIsSuccess]);

  // Fetch once on mount
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Derive local groups when posts change
  useEffect(() => {
    if (posts.length > 0) {
      setFirstPost(posts[0]);
      setFirstLinePostGroup(posts.slice(1, 4));
      setSecondLinePostGroup(posts.slice(4, 7));
      setEightPost(posts[7]);
    }
  }, [posts]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-8">
        Newest Posts
      </h2>
      {postsIsLoading && (
        <div className="flex justify-between p-2 gap-4 md:gap-5 flex-wrap">
          <MainPostSkeleton />
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            {[0, 1, 2].map((i) => (
              <SidePostSkeleton key={`fpsk-${i}`} />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            {[0, 1, 2].map((i) => (
              <SidePostSkeleton key={`spsk-${i}`} />
            ))}
          </div>
          <MainPostSkeleton />
        </div>
      )}
      {postsIsError && <p>Error: {postsIsError}</p>}

      {!postsIsLoading && !postsIsError && posts.length > 0 && (
        <div className="flex justify-between p-2 gap-4 md:gap-5 flex-wrap">
          {/* First Post */}
          {firstPost && <MainPost post={firstPost} key={firstPost._id} />}

          {/* First Line Post Group */}
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            {firstLinePostGroup.map((post) => (
              <SidePost post={post} key={post._id} />
            ))}
          </div>

          {/* Second Line Post Group */}
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            {secondLinePostGroup.map((post) => (
              <SidePost post={post} key={post._id} />
            ))}
          </div>
          {/* Eighth Post */}
          {eightPost && <MainPost post={eightPost} key={eightPost._id} />}
        </div>
      )}
    </div>
  );
};

export default NewestPosts;
