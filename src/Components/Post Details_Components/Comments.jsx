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
    <div className="w-full rounded-lg border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-center font-bold text-xl md:text-2xl">Comments</h2>
      </div>
      <div className="divide-y divide-white/10">
        {postsComments.map((comment) => (
          <div key={comment._id} className="px-4 py-3">
            <p className="font-semibold text-sm opacity-80">
              By {comment?.userName}
            </p>
            <p className="mt-1 text-base md:text-lg">{comment?.text}</p>
          </div>
        ))}
        {postsComments.length === 0 && (
          <div className="px-4 py-6 text-center opacity-80">
            No comments yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
