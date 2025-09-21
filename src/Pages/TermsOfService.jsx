import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import SEO from "../Components/SEO";

const Card = ({ children, borderColor, bgCard }) => (
  <div
    className="rounded-xl p-5 md:p-6 shadow-sm"
    style={{ border: `1px solid ${borderColor}`, backgroundColor: bgCard }}
  >
    {children}
  </div>
);

const TermsOfService = () => {
  const { primaryColor, textColor } = useSelector((s) => s.color.colors);

  const mode = localStorage.getItem("mode") || "dark";
  // Mirror PrivacyPolicy logic so visuals match site theme handling
  const isLight = mode === "dark";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const bgSoft = isLight ? "#F8FAFC" : "rgba(255,255,255,0.03)";
  const bgCard = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
  const muted = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  const effectiveDate = new Date().toLocaleDateString();

  return (
    <>
      <SEO
        title="Terms of Service - IntraVerse"
        description="The rules for using IntraVerse: viewing posts and submitting anonymous comments."
        keywords="Terms of Service, User Agreement, IntraVerse"
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
          <div className="relative z-10">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
              style={{
                color: primaryColor,
                backgroundColor: isLight
                  ? `${primaryColor}14`
                  : `${primaryColor}22`,
                border: `1px solid ${primaryColor}55`,
              }}
            >
              IntraVerse
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Terms of Service
            </h1>
            <p
              className="mt-3 md:mt-4 text-sm md:text-base"
              style={{ color: muted }}
            >
              Please read these terms carefully. By using IntraVerse, you agree
              to these rules.
            </p>
            <p className="mt-1 text-xs md:text-sm" style={{ color: muted }}>
              Effective date: {effectiveDate}
            </p>
          </div>
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">1. Overview</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                IntraVerse is a blog where visitors can browse posts and leave
                comments anonymously by entering a display name and message. No
                user accounts are created or required.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                2. Acceptance of Terms
              </h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                By accessing or using IntraVerse, you agree to be bound by these
                Terms of Service and all applicable laws. If you do not agree,
                please discontinue use of the site.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                3. Use of the Service
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • You may read posts and submit comments without an account.
                </li>
                <li>
                  • Comments must be respectful, lawful, and relevant to the
                  post.
                </li>
                <li>
                  • Do not impersonate others or post content that is harmful,
                  defamatory, hateful, or illegal.
                </li>
                <li>
                  • We may moderate, edit, or remove comments at our discretion.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                4. User Content (Comments)
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • You retain any rights you hold in your comment content.
                </li>
                <li>
                  • By posting a comment, you grant us a non‑exclusive,
                  worldwide license to display and distribute it with the
                  related post.
                </li>
                <li>
                  • Comments are submitted with a display name you type; no
                  account profile is created.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                5. Prohibited Activities
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>• Spam, scams, or deceptive practices.</li>
                <li>• Harassment, hate speech, or incitement of violence.</li>
                <li>
                  • Posting illegal content or infringing intellectual property.
                </li>
                <li>
                  • Attempting to disrupt or reverse‑engineer site
                  functionality.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                6. Intellectual Property
              </h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                Site content (including posts, design, and branding) is owned by
                IntraVerse or its licensors and protected by law. You may not
                use our marks or content without permission.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">7. Disclaimers</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                The site is provided “as is” without warranties of any kind. We
                do not guarantee uninterrupted or error‑free operation or the
                accuracy of user comments.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                8. Limitation of Liability
              </h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                To the fullest extent permitted by law, IntraVerse and its
                owners will not be liable for any indirect, incidental, or
                consequential damages arising from your use of the site.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">9. Changes</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                We may update these Terms from time to time. Continued use of
                the site after changes means you accept the new Terms.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">10. Contact</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                Questions about these Terms? Contact us at
                <span className="font-semibold" style={{ color: primaryColor }}>
                  {" "}
                  jk4350649@gmail.com
                </span>
                .
              </p>
            </Card>
          </div>

          {/* Quick summary */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5 sticky top-6"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: bgSoft,
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold">At a Glance</h3>
              <ul className="mt-3 space-y-3 text-sm" style={{ color: muted }}>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Read posts freely; comment anonymously with a display name.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Keep it respectful and lawful; we moderate comments.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  No accounts required; site provided as‑is without warranties.
                </li>
              </ul>
              <div
                className="mt-5 p-4 rounded-xl"
                style={{
                  backgroundColor: isLight
                    ? `${primaryColor}0F`
                    : `${primaryColor}22`,
                  border: `1px solid ${primaryColor}55`,
                }}
              >
                <p className="text-sm">
                  Be kind and constructive—your words help shape the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-8 md:mt-12 text-xs md:text-sm text-center"
          style={{ color: muted }}
        >
          These Terms may change from time to time. We recommend reviewing them
          periodically.
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
