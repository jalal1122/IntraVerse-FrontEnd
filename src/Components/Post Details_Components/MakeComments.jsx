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

  const borderColor =
    localStorage.getItem("mode") === "light"
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(0, 0, 0, 0.12)";

  const BgColor =
    localStorage.getItem("mode") === "light"
      ? "rgba(255, 255, 255, 0.05)"
      : "#F3F8FE";

  return (
    <div
      className="p-4 md:p-5 border  rounded-lg flex flex-col gap-4"
      style={{
        borderColor: borderColor,
        backgroundColor: BgColor,
      }}
    >
      <h2 className="text-center font-bold text-xl md:text-2xl">
        Add a Comment
      </h2>
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
          autoComplete="off"
          placeholder="Your Name"
          className="border bg-transparent p-2 rounded-md focus:outline-none focus:ring-2"
          style={{ outlineColor: primaryColor, borderColor: borderColor }}
        />
        <textarea
          className="w-full border bg-transparent p-2 rounded-md focus:outline-none focus:ring-2"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          autoComplete="off"
          id="comment"
          rows="4"
          placeholder="Write your comment..."
          style={{ outlineColor: primaryColor, borderColor: borderColor }}
        ></textarea>
        <button
          className="mt-2 text-white font-semibold px-6 py-2 rounded-md w-fit self-center hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeComments;
