import { Title, Meta } from "react-head";

/**
 * Unified SEO component.
 * Backwards compatible with previous props while adding:
 *  - Safe handling when url is undefined
 *  - Correct canonical (no title-slice hack)
 *  - Optional noIndex
 *  - Richer Open Graph & Twitter tags
 *  - Article meta (published / modified / tags)
 *  - JSON‑LD for both Article & Website
 */
export default function SEO({
  title = "IntraVerse",
  description,
  keywords,
  url, // full URL of the current page (preferred)
  canonicalUrl, // optional explicit canonical override
  slug, // optional slug to build canonical if url not passed
  image = "./banner.png",
  type, // "article" | "website" (auto-detected if not provided)
  author = "IntraVerse",
  datePublished,
  dateModified,
  tags = [], // array of strings (article tags)
  noIndex = false,
  siteName = "IntraVerse",
  locale = "en_US",
}) {
  const SITE_URL = "https://intraverse.me";

  // Fallback description
  const metaDescription =
    description ||
    "IntraVerse – Fresh perspectives, clean design, and modern web insights.";

  // Determine canonical
  const canonical =
    canonicalUrl ||
    url ||
    (slug
      ? `${SITE_URL.replace(/\/$/, "")}/${slug.replace(/^\//, "")}`
      : SITE_URL);

  // Auto infer type if not provided
  const inferredType =
    type || (canonical?.includes("/post/") ? "article" : "website");

  // Normalize keywords: accept string or array
  const keywordString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || (Array.isArray(tags) ? tags.join(", ") : undefined);

  // Article JSON‑LD (only if article)
  const articleJsonLd =
    inferredType === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: metaDescription,
          image: image ? [image] : undefined,
          author: { "@type": "Person", name: author },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          datePublished: datePublished || undefined,
          dateModified: dateModified || datePublished || undefined,
          keywords: keywordString,
          articleSection: tags && tags.length ? tags[0] : undefined,
        }
      : null;

  // Website JSON‑LD (for non-article pages)
  const websiteJsonLd =
    inferredType !== "article"
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: SITE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={query}`,
            "query-input": "required name=query",
          },
        }
      : null;

  return (
    <>
      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="IntraVerse Blog RSS Feed"
        href="https://intraverse.me/rss.xml"
      />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Basic Meta */}
      {title && <Title>{title}</Title>}
      {metaDescription && <Meta name="description" content={metaDescription} />}
      {keywordString && <Meta name="keywords" content={keywordString} />}
      <Meta name="author" content={author} />
      {noIndex && <Meta name="robots" content="noindex,follow" />}
      {!noIndex && <Meta name="robots" content="index,follow" />}

      {/* Open Graph */}
      <Meta property="og:site_name" content={siteName} />
      <Meta property="og:locale" content={locale} />
      {title && <Meta property="og:title" content={title} />}
      {metaDescription && (
        <Meta property="og:description" content={metaDescription} />
      )}
      {image && <Meta property="og:image" content={image} />}
      {canonical && <Meta property="og:url" content={canonical} />}
      <Meta property="og:type" content={inferredType} />
      {dateModified && (
        <Meta property="og:updated_time" content={dateModified} />
      )}
      {inferredType === "article" && datePublished && (
        <Meta property="article:published_time" content={datePublished} />
      )}
      {inferredType === "article" && dateModified && (
        <Meta property="article:modified_time" content={dateModified} />
      )}
      {inferredType === "article" &&
        tags &&
        tags
          .slice(0, 6)
          .map((t) => <Meta key={t} property="article:tag" content={t} />)}

      {/* Twitter */}
      <Meta name="twitter:card" content="summary_large_image" />
      {title && <Meta name="twitter:title" content={title} />}
      {metaDescription && (
        <Meta name="twitter:description" content={metaDescription} />
      )}
      {image && <Meta name="twitter:image" content={image} />}
      {author && <Meta name="twitter:creator" content={author} />}

      {/* JSON-LD */}
      {articleJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd)}
        </script>
      )}
      {websiteJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
      )}
    </>
  );
}
