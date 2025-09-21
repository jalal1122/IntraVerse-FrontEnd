import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import RightSideIcons from "./RightSideIcons";
import SearchBar from "./SearchBar";
import { Link } from "react-router";

const Header = () => {
  // Initialize Redux dispatch and selectors
  // to access color state and mode

  const { primaryColor, textColor } = useSelector(
    (state) => state.color.colors
  );

  // render the header component
  const [open, setOpen] = useState(false);

  // Choose a subtle translucent background for mobile dropdown based on text color brightness
  const mobileBg = useMemo(() => {
    const hex = (textColor || "#ffffff").replace("#", "");
    const r =
      parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) ||
      255;
    const g =
      parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) ||
      255;
    const b =
      parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) ||
      255;
    // Perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    // If text is light, use dark backdrop; otherwise light backdrop
    return brightness > 150 ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)";
  }, [textColor]);

  return (
    <>
      <header
        className="App-header sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/5"
        style={{ color: textColor }}
      >
        <div className="mx-auto flex items-center gap-3 justify-between w-full xl:w-[1200px] px-3 xl:px-0 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1
              className="font-extrabold text-3xl md:text-4xl tracking-tight"
              style={{ color: textColor, cursor: "pointer" }}
            >
              <Link to="/">
                Intra
                <span style={{ color: primaryColor }}>Verse</span>
              </Link>
            </h1>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5 font-semibold text-base">
              <li>
                <Link
                  to="/"
                  className="relative transition-colors"
                  style={{ color: textColor }}
                >
                  Home
                  <span
                    className="block h-0.5 scale-x-0 transition-transform origin-left"
                    style={{ backgroundColor: primaryColor }}
                  ></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-blogs"
                  className="relative transition-colors"
                  style={{ color: textColor }}
                >
                  MyBlogs
                  <span
                    className="block h-0.5 scale-x-0 transition-transform origin-left"
                    style={{ backgroundColor: primaryColor }}
                  ></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="relative transition-colors"
                  style={{ color: textColor }}
                >
                  About
                  <span
                    className="block h-0.5 scale-x-0 transition-transform origin-left"
                    style={{ backgroundColor: primaryColor }}
                  ></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="relative transition-colors"
                  style={{ color: textColor }}
                >
                  Contact
                  <span
                    className="block h-0.5 scale-x-0 transition-transform origin-left"
                    style={{ backgroundColor: primaryColor }}
                  ></span>
                </Link>
              </li>
            </ul>

            {/* Search */}
            <div className="relative hidden md:block">
              <SearchBar />
            </div>

            {/* Icons */}
            <RightSideIcons />
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Optional: compact search icon could open a search drawer in future */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center rounded-md p-2 outline-none focus:ring-2"
              style={{ color: textColor, outlineColor: primaryColor }}
            >
              {/* Hamburger icon */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden backdrop-blur-sm border-t"
            style={{
              backgroundColor: mobileBg,
              color: textColor,
              borderColor: primaryColor + "33",
            }}
          >
            <div className="relative px-3 py-3 flex flex-col gap-4 w-full xl:w-[1200px] mx-auto">
              <SearchBar />
              <ul className="flex flex-col gap-3 font-semibold text-base">
                <li>
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded transition-colors"
                    style={{ color: "white" }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blogs"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded transition-colors"
                    style={{ color: "white" }}
                  >
                    MyBlogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded transition-colors"
                    style={{ color: "white" }}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded transition-colors"
                    style={{ color: "white" }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div
                className="pt-2 border-t"
                style={{ borderColor: primaryColor + "33" }}
              >
                <RightSideIcons />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
