import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string;
  schemaType?: "WebApplication" | "Article" | "FAQPage";
  customSchema?: Record<string, any>;
}

export function SEOHead({
  title = "MetLL - Confess Anonymously & Date",
  description = "MetLL is the anonymous confession app where you can confess your secret crush from school, college, office, or any location. We reveal the match when mutual feelings are detected.",
  canonicalUrl = "https://metll.in",
  ogImage = "https://metll.in/og-image.png",
  keywords = "anonymous confession, dating app, secret crush, matchmaking, love, mutual feelings, crush finder",
  schemaType = "WebApplication",
  customSchema
}: SEOHeadProps) {
  
  // Default Application Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": title,
    "description": description,
    "url": canonicalUrl,
    ...(schemaType === "WebApplication" && {
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  };

  const finalSchema = customSchema || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={schemaType === "Article" ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
