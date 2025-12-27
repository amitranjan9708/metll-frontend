import { useEffect } from "react";

interface AdSenseProps {
  slot?: string;
  style?: React.CSSProperties;
  format?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  layout?: string;
  layoutKey?: string;
  className?: string;
}

export function AdSense({
  slot,
  style = { display: "block" },
  format = "auto",
  layout,
  layoutKey,
  className = "",
}: AdSenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-8030938377193796"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layout && { "data-ad-layout": layout })}
      {...(layoutKey && { "data-ad-layout-key": layoutKey })}
    />
  );
}

// Predefined ad unit components for common placements
export function AdSenseBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <AdSense
        format="auto"
        style={{ display: "block", width: "100%", maxWidth: "728px", height: "90px" }}
        className={className}
      />
    </div>
  );
}

export function AdSenseRectangle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <AdSense
        format="rectangle"
        style={{ display: "block", width: "100%", maxWidth: "300px", height: "250px" }}
        className={className}
      />
    </div>
  );
}

export function AdSenseInArticle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <AdSense
        format="fluid"
        layout="in-article"
        style={{ display: "block", width: "100%", maxWidth: "728px", minHeight: "90px" }}
        className={className}
      />
    </div>
  );
}

export function AdSenseSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <AdSense
        format="vertical"
        style={{ display: "block", width: "100%", maxWidth: "160px", height: "600px" }}
        className={className}
      />
    </div>
  );
}

