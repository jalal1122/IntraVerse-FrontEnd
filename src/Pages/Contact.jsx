import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import SEO from "../Components/SEO";
import axios from "../utils/axios.js";

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  primaryColor,
  borderColor,
  textColor,
}) => (
  <label className="block">
    <span className="text-sm font-semibold">{label}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded-lg px-3 py-2 outline-none"
      style={{
        color: textColor,
        backgroundColor: "transparent",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 0 3px transparent`,
      }}
      onFocus={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 3px ${primaryColor}33`)
      }
      onBlur={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 3px transparent`)
      }
    />
  </label>
);

const TextArea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 6,
  primaryColor,
  borderColor,
  textColor,
}) => (
  <label className="block">
    <span className="text-sm font-semibold">{label}</span>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-1 w-full rounded-lg px-3 py-2 outline-none resize-y"
      style={{
        color: textColor,
        backgroundColor: "transparent",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 0 3px transparent`,
      }}
      onFocus={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 3px ${primaryColor}33`)
      }
      onBlur={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 3px transparent`)
      }
    />
  </label>
);

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

const Contact = () => {
  const { primaryColor, textColor } = useSelector((s) => s.color.colors);
  const mode = localStorage.getItem("mode") || "dark";
  const isLight = mode === "dark";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const bgSoft = isLight ? "#F8FAFC" : "rgba(255,255,255,0.03)";
  const bgCard = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
  const muted = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    done: false,
    error: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, done: false, error: "" });

    try {
      await axios.post("/api/contact", form);
      setStatus({ loading: false, done: true, error: "" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({
        loading: false,
        done: false,
        error: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <>
      <SEO
        title="Contact • IntraVerse"
        description="Say hello! Send a message to collaborate, share ideas, or give feedback."
        keywords="Contact Muhammad Uzair, Contact IntraVerse, Collaborate with Muhammad Uzair, Feedback for IntraVerse"
        url={window.location.href}
        // image="https://intraverse.app/logo192.png"
        type="website"
        author="Muhammad Uzair"
      />
      <Header />

      <div
        className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 my-6 md:my-10"
        style={{ color: textColor }}
      >
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-10 mb-6 md:mb-10"
          style={{
            border: `1px solid ${borderColor}`,
            background: isLight
              ? `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`
              : `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}0F)`,
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Pill primaryColor={primaryColor}>Let’s build something</Pill>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Get in touch
              </h1>
              <p
                className="mt-3 md:mt-4 text-sm md:text-base max-w-2xl"
                style={{ color: muted }}
              >
                Have an idea, question, or feedback? I’d love to hear from you.
                Fill out the form and I’ll get back soon.
              </p>
            </div>
          </div>

          {/* Decorative glows */}
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* About blurb */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-5"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: bgSoft,
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold">
                A little about me
              </h3>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                I’m Muhammad Uzair — a product-minded frontend engineer who
                crafts clean, fast, and accessible interfaces. I care about
                clarity, performance, and the small details that make products
                delightful.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "Redux",
                  "Vite",
                  "Tailwind",
                  "Node.js",
                  "MongoDB",
                ].map((s) => (
                  <Pill key={s} primaryColor={primaryColor}>
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-5 md:p-6"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: bgCard,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={onChange}
                  primaryColor={primaryColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                  primaryColor={primaryColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="What’s this about?"
                  value={form.subject}
                  onChange={onChange}
                  primaryColor={primaryColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              </div>
              <div className="mt-4">
                <TextArea
                  label="Message"
                  name="message"
                  placeholder="Tell me a bit about your idea or question…"
                  value={form.message}
                  onChange={onChange}
                  rows={8}
                  primaryColor={primaryColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-xs" style={{ color: muted }}>
                  I’ll reply within 1–2 business days. Your info stays private.
                </div>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:cursor-pointer disabled:opacity-70"
                  style={{ backgroundColor: primaryColor, color: "white" }}
                >
                  {status.loading
                    ? "Sending…"
                    : status.done
                    ? "Sent ✔"
                    : "Send Message"}
                </button>
              </div>

              {status.error && (
                <div className="mt-3 text-sm" style={{ color: "#ff6b6b" }}>
                  {status.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
