import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, postsReset } from "../../features/Posts/postsSlice.js";
import { useEffect, useState } from "react";
import SidePost from "../SidePost";
import Loader from "../Loader";
import MainPost from "../MainPost.jsx";

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
    if (posts.length > 0) {
      setFirstPost(posts[0]);
      setFirstLinePostGroup(posts.slice(1, 4));
      setSecondLinePostGroup(posts.slice(4, 7));
      setEightPost(posts[7]);
    }

    if (postsIsSuccess) {
      dispatch(postsReset());
    }

    dispatch(getAllPosts());
  }, [dispatch, posts]);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-7 ">
        Newest Posts
      </h2>
      {postsIsLoading && <Loader />}
      {postsIsError && <p>Error: {postsIsError}</p>}

      {!postsIsLoading && !postsIsError && posts.length > 0 && (
        <div className="flex justify-between p-2 gap-3 flex-wrap">
          {/* First Post */}
          {firstPost && (
            <MainPost post={firstPost} key={firstPost._id} />
          )}
          {/* First Line Post Group */}
          <div className="flex flex-col gap-4 w-[48%]">
            {firstLinePostGroup.map((post) => (
              <SidePost post={post} key={post._id} />
            ))}
          </div>
          {/* Second Line Post Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {secondLinePostGroup.map((post) => (
              <div key={post._id} className="border p-2">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">
                  {post.content.slice(0, 60)}...
                </p>
              </div>
            ))}
          </div>
          {/* Eighth Post */}
          {eightPost && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">{eightPost.title}</h3>
              <p className="text-sm text-gray-600">
                {eightPost.content.slice(0, 100)}...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewestPosts;
