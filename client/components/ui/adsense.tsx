import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  style?: React.CSSProperties;
  className?: string;
  layout?: string;
  layoutKey?: string;
  fullWidthResponsive?: boolean;
}

/**
 * Google AdSense Component
 * 
 * Usage:
 * <AdSense adSlot="1234567890" />
 * 
 * Or use predefined components:
 * <AdSenseBanner />
 * <AdSenseRectangle />
 * <AdSenseInArticle />
 */
export function AdSense({
  adSlot,
  adFormat = "auto",
  style,
  className = "",
  layout,
  layoutKey,
  fullWidthResponsive = true,
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    if (!adRef.current || isPushed.current) return;

    try {
      // Push ad to Google AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isPushed.current = true;
    } catch (err) {
      console.error("AdSense initialization error:", err);
    }
  }, []);

  const defaultStyle: React.CSSProperties = {
    display: "block",
    ...style,
  };

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-8030938377193796"
        {...(adSlot && { "data-ad-slot": adSlot })}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : undefined}
        {...(layout && { "data-ad-layout": layout })}
        {...(layoutKey && { "data-ad-layout-key": layoutKey })}
      />
    </div>
  );
}

/**
 * Banner Ad (728x90) - Horizontal banner for top/bottom of page
 */
export function AdSenseBanner({ 
  adSlot, 
  className = "" 
}: { 
  adSlot?: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat="auto"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px",
        }}
        className={className}
      />
    </div>
  );
}

/**
 * Rectangle Ad (300x250) - Medium rectangle for sidebars
 */
export function AdSenseRectangle({ 
  adSlot, 
  className = "" 
}: { 
  adSlot?: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat="rectangle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "300px",
          minHeight: "250px",
        }}
        className={className}
      />
    </div>
  );
}

/**
 * In-Article Ad - Fluid ad that fits within article content
 */
export function AdSenseInArticle({ 
  adSlot, 
  className = "" 
}: { 
  adSlot?: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat="fluid"
        layout="in-article"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px",
        }}
        className={className}
      />
    </div>
  );
}

/**
 * Vertical Ad (160x600) - Skyscraper for sidebars
 */
export function AdSenseVertical({ 
  adSlot, 
  className = "" 
}: { 
  adSlot?: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat="vertical"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "160px",
          minHeight: "600px",
        }}
        className={className}
      />
    </div>
  );
}

/**
 * Responsive Ad - Automatically adjusts to container size
 */
export function AdSenseResponsive({ 
  adSlot, 
  className = "" 
}: { 
  adSlot?: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat="auto"
        style={{
          display: "block",
          width: "100%",
        }}
        className={className}
      />
    </div>
  );
}
