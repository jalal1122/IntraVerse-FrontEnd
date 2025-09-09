import { FaUser, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getMode } from "../../features/Colors/colorSlice.js";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../features/User/userSlice.js";

const RightSideIcons = () => {
  // Initialize Redux dispatch and selectors
  // to access color state and mode
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mode = useSelector((state) => state.color.mode);
  const textColor = useSelector((state) => state.color.colors.textColor);
  const user = useSelector((state) => state.user.user); // Get user from Redux

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    localStorage.setItem("mode", newMode);
    dispatch(getMode(newMode));
  };

  // Check if user is logged in based on Redux state or localStorage
  const isUserLoggedIn = user || localStorage.getItem("user");

  return (
    <div className="flex justify-between items-center gap-4">
      {isUserLoggedIn ? (
        // Logout Icon
        <Link
          to="/"
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
        >
          <FaSignOutAlt
            size={25}
            className="hover:scale-110 transition-transform duration-300"
            style={{
              color: textColor,
              cursor: "pointer",
            }}
            aria-label="Logout"
            title="Logout"
          />
        </Link>
      ) : (
        <>
          {/* Login Icon */}
          <Link to="/login">
            <MdLogin
              size={25}
              className="hover:scale-110 transition-transform duration-300"
              style={{
                color: textColor,
                cursor: "pointer",
              }}
              aria-label="Login"
              title="Login"
            />
          </Link>

          {/* Register Icon */}
          <Link to="/register">
            <FaUser
              size={25}
              className="hover:scale-110 transition-transform duration-300"
              style={{
                color: textColor,
                cursor: "pointer",
              }}
              aria-label="Register"
              title="Register"
            />
          </Link>
        </>
      )}

      <button
        onClick={toggleTheme}
        title="Toggle Theme"
        aria-label="Toggle Theme"
        className="text-xl hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
      >
        {mode === "dark" ? <FaSun size={25} /> : <FaMoon size={25} />}
      </button>
    </div>
  );
};

export default RightSideIcons;
