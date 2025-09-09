import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchBar = () => {
  // Initialize Redux dispatch and selectors
  // to access color state and mode
  const secondaryColor = useSelector(
    (state) => state.color.colors.secondaryColor
  );

  return (
    <div
      className="search flex justify-between items-center gap-2 rounded-3xl px-4 py-2"
      style={{
        backgroundColor: secondaryColor,
        color: "black",
      }}
    >
      <input
        type="text"
        className="border-none focus:outline-none"
        placeholder="Search Blogs"
      />
      <FaSearch
        style={{
          color: "black",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default SearchBar;
