import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../features/Posts/postsSlice";

const MakeComments = () => {
  const { textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    postId: "",
    username: "",
    comment: "",
  });

  useEffect(() => {
    if (post) {
      setFormData((prev) => ({ ...prev, postId: post._id }));
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.username || !formData.comment) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(addComment(formData));

    // Reset form after submission
    setFormData({ username: "", comment: "" });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
      <h1 className="text-center font-bold text-2xl hover:underline underline-offset-4 mb-2">
        Add a Comment
      </h1>
      <form
        onSubmit={(e) => submitForm(e)}
        className="flex flex-col gap-3"
        style={{ color: textColor }}
      >
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Your Name"
          className="border border-gray-300 p-2 rounded-md"
        />
        <textarea
          className="w-full border border-gray-300 p-2 rounded-md"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          id="comment"
          rows="4"
          placeholder="Write your comment..."
        ></textarea>
        <button
          className="mt-2 text-white font-semibold px-8 py-2 rounded-md w-fit mx-auto"
          style={{ backgroundColor: primaryColor }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeComments;
