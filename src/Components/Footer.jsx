import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import blogCategories from "../utils/blogCategories";

const Pill = ({ children, primaryColor }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
    style={{
      color: primaryColor,
      backgroundColor: `${primaryColor}1A`,
      border: `1px solid ${primaryColor}66`,
    }}
  >
    {children}
  </span>
);

const Footer = () => {
  const { primaryColor, textColor } = useSelector((s) => s.color.colors);
  const mode = localStorage.getItem("mode") || "dark";
  const isLight = mode === "dark";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const bgSoft = isLight ? "#F8FAFC" : "rgba(255,255,255,0.03)";
  const muted = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  const topCats = blogCategories.slice(0, 9);

  return (
    <footer className="mt-10" style={{ color: textColor }}>
      <div
        className="relative overflow-hidden rounded-t-2xl px-4 md:px-6 lg:px-8 py-10"
        style={{
          borderTop: `1px solid ${borderColor}`,
          background: isLight
            ? `linear-gradient(135deg, ${primaryColor}08, transparent)`
            : `linear-gradient(135deg, ${primaryColor}22, transparent)`,
        }}
      >
        <div className="mx-auto w-full max-w-6xl">
          {/* Brand + short pitch */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Intra<span style={{ color: primaryColor }}>Verse</span>
              </h2>
              <p
                className="mt-2 text-sm md:text-base max-w-xl"
                style={{ color: muted }}
              >
                Curated thoughts, modern tech, and clean design. Built for
                clarity, crafted with care.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-semibold">
              <Link to="/" className="hover:opacity-90">
                Home
              </Link>
              <Link to="/about" className="hover:opacity-90">
                About
              </Link>
              <Link to="/contact" className="hover:opacity-90">
                Contact
              </Link>
              <Link to="/privacy-policy" className="hover:opacity-90">
                Privacy
              </Link>
              <Link to="/terms-of-service" className="hover:opacity-90">
                Terms
              </Link>
            </div>
          </div>

          {/* Category pills */}
          <div
            className="mt-6 md:mt-8 p-4 rounded-xl"
            style={{
              backgroundColor: bgSoft,
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="text-sm font-semibold">Popular Categories</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCats.map((c) => (
                <Pill key={c} primaryColor={primaryColor}>
                  {c}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="pointer-events-none select-none">
          <div
            className="absolute -top-10 -right-10 w-60 h-60 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-4 md:px-6 lg:px-8 py-5 border-t"
        style={{ borderColor: borderColor }}
      >
        <div
          className="mx-auto w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: muted }}
        >
          <div>
            © {new Date().getFullYear()} IntraVerse • Designed by Muhammad Uzair
          </div>
          <div className="flex items-center gap-3">
            <a href="/privacy-policy" className="hover:opacity-90">
              Privacy
            </a>
            <span>•</span>
            <a href="/terms-of-service" className="hover:opacity-90">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
