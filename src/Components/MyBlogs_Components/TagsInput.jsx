import { useMemo, useState } from "react";

// Reusable tags input (YouTube-like)
// Props:
// - value: string[]
// - onChange: (tags: string[]) => void
// - placeholder?: string
// - maxTags?: number (default 10)
// - theme?: { primaryColor?: string; textColor?: string }
const TagsInput = ({
  value = [],
  onChange,
  placeholder = "Add a tag and press Enter",
  maxTags = 10,
  theme,
}) => {
  const [input, setInput] = useState("");

  const lowerSet = useMemo(
    () => new Set(value.map((t) => t.toLowerCase())),
    [value]
  );

  const addTags = (tags) => {
    if (!onChange) return;
    const next = [...value];
    for (let t of tags) {
      const tag = t.trim();
      if (!tag) continue;
      if (next.length >= maxTags) break;
      if (lowerSet.has(tag.toLowerCase())) continue;
      next.push(tag);
    }
    if (next.length !== value.length) onChange(next);
  };

  const handleAddFromInput = () => {
    if (!input.trim()) return;
    addTags([input]);
    setInput("");
  };

  const removeTag = (idx) => {
    if (!onChange) return;
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if ((key === "Enter" || key === "," || key === "Tab") && input.trim()) {
      e.preventDefault();
      handleAddFromInput();
    } else if (key === "Backspace" && !input) {
      // delete last tag
      if (value.length > 0) removeTag(value.length - 1);
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData?.getData("text");
    if (!text) return;
    const parts = text
      .split(/[\n,]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 1) {
      e.preventDefault();
      addTags(parts);
    }
  };

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus-within:ring-2"
        style={{
          outline: "none",
          boxShadow: "none",
        }}
        onClick={() => {
          const el = document.getElementById("tags-input-field");
          el && el.focus();
        }}
      >
        {value.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${theme?.primaryColor || "#3b82f6"}1A`,
              color: theme?.textColor || "#111827",
              border: `1px solid ${theme?.primaryColor || "#3b82f6"}`,
            }}
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              className="ml-1 hover:opacity-80"
              onClick={() => removeTag(idx)}
              style={{ color: theme?.primaryColor || "#3b82f6" }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id="tags-input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleAddFromInput}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:opacity-60"
          style={{ color: theme?.textColor || "inherit" }}
          disabled={value.length >= maxTags}
        />
      </div>
      <div className="mt-1 text-xs opacity-70">
        {value.length}/{maxTags} tags
      </div>
    </div>
  );
};

export default TagsInput;
