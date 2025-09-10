import { useDispatch, useSelector } from "react-redux";
import { getPostComments } from "../../features/Posts/postsSlice";
import { useEffect } from "react";
import { useParams } from "react-router";

const Comments = () => {
  const dispatch = useDispatch();

  const { postsComments } = useSelector((state) => state.posts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostComments(id));
  }, [dispatch, id]);

  return (
    <div>
        <h1 className="text-center font-bold text-2xl hover:underline underline-offset-4 mb-2">Comments</h1>
      {postsComments.map((comment) => (
        <div key={comment._id} className="border-b border-gray-300 py-2">
          <p className="font-semibold">By {comment?.userName}</p>
          <p className=" font-bold text-xl">{comment?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
