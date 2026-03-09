"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function MarqueeBand({
  children,
  speed = 120,
  direction = "left",
  pauseOnHover = true,
  className = "",
  style,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [copies, setCopies] = useState(4);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      if (w === 0) return;
      setTrackW(w);
      // Enough copies to fill 3× viewport — guarantees no blank space at any size
      const needed = Math.ceil((window.innerWidth * 3) / w) + 1;
      setCopies(Math.max(needed, 4));
    };

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const duration = trackW > 0 ? trackW / speed : 30;
  // Both directions use --marquee-shift = -trackW.
  // "left":  translateX(0) → translateX(-trackW)   [content drifts left]
  // "right": translateX(-trackW) → translateX(0)   [content drifts right]
  const animName = direction === "left" ? "marquee-band-left" : "marquee-band-right";

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ display: "flex", alignItems: "stretch", ...style }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          width: "max-content",
          height: "100%",
          willChange: "transform",
          ["--marquee-shift" as string]: trackW ? `-${trackW}px` : "0px",
          animationName: trackW ? animName : "none",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Copy 1 — used for width measurement */}
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", flexShrink: 0, height: "100%" }}>
          {children}
        </div>
        {/* Extra copies — enough to always fill the screen */}
        {Array.from({ length: copies - 1 }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0, height: "100%" }} aria-hidden>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
