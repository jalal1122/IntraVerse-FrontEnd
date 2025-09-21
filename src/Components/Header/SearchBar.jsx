import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  searchPosts,
  postSearchResultsReset,
} from "../../features/Posts/postsSlice";

const SearchBar = () => {
  // Theme colors
  const { secondaryColor, textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const dispatch = useDispatch();

  // get the search state from redux
  const {
    postSearchResults,
    postSearchResultsIsLoading,
    postSearchResultsIsError,
  } = useSelector((state) => state.posts);

  // Local state
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  const placeholder = "Search Blogs";

  const showModal = useMemo(
    () => open && (query?.trim()?.length || 0) > 0,
    [open, query]
  );

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close when dropdown is open
  useEffect(() => {
    if (!showModal) return;
    const handleClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [showModal]);

  // Debounced search (500ms). Replace the TODO with your backend call.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      dispatch(postSearchResultsReset());
      setOpen(false);
      return;
    }

    setOpen(true);

    debounceRef.current = setTimeout(async () => {
      dispatch(searchPosts(trimmed));
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query, dispatch]);

  // Reset results when unmounting to keep state clean
  useEffect(() => {
    return () => dispatch(postSearchResultsReset());
  }, [dispatch]);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto">
      <div
        className="relative search flex items-center gap-2 rounded-3xl px-4 py-2 w-full"
        style={{ backgroundColor: secondaryColor, color: "black" }}
      >
        <FaSearch className="opacity-80" />
        <input
          type="text"
          className="w-full bg-transparent border-none focus:outline-none placeholder:opacity-70"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setOpen(true)}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              setQuery("");
              dispatch(postSearchResultsReset());
              setOpen(false);
            }}
            className="p-1 rounded hover:opacity-80"
            style={{ color: "black" }}
          >
            <FaTimes />
          </button>
        )}
      </div>


      {showModal && (
        <div className="absolute z-50 top-full -translate-x-1/2 mt-2 w-[90vw] md:w-[60vw] max-w-[1100px]">
          <div
            className="absolute left-50 sm:left-50 md:-left-40 w-full rounded-xl shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: "#0b0b0b",
              color: textColor,
              borderColor: `${primaryColor}22`,
            }}
            role="listbox"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: `${primaryColor}33` }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FaSearch style={{ color: primaryColor }} />
                <span className="opacity-90 shrink-0">Searching for:</span>
                <strong className="truncate">{query}</strong>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 hover:opacity-80"
                aria-label="Close"
                style={{ color: textColor }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto">
              {postSearchResultsIsLoading && (
                <div className="p-4 grid gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-32 h-20 rounded bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                        <div className="h-3 w-1/3 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!postSearchResultsIsLoading && postSearchResultsIsError && (
                <div className="p-6 text-center opacity-90">
                  Failed to search
                </div>
              )}

              {!postSearchResultsIsLoading &&
                !postSearchResultsIsError &&
                (postSearchResults?.length || 0) === 0 && (
                  <div className="p-6 text-center opacity-80">
                    No results found
                  </div>
                )}

              {!postSearchResultsIsLoading &&
                !postSearchResultsIsError &&
                (postSearchResults?.length || 0) > 0 && (
                  <ul className="p-2 md:p-3 grid gap-2">
                    {postSearchResults.map((post) => (
                      <li
                        key={post._id}
                        className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        // TODO: Optionally navigate to post details here
                        onClick={() => setOpen(false)}
                        role="option"
                        aria-selected={false}
                      >
                        {/* Thumbnail */}
                        <div className="w-28 h-20 md:w-40 md:h-24 rounded overflow-hidden bg-white/10 shrink-0">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm opacity-60">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-semibold text-base md:text-lg leading-snug"
                            style={{ color: textColor }}
                          >
                            {post.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs md:text-sm opacity-80">
                            <FaRegCalendarAlt style={{ color: primaryColor }} />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
