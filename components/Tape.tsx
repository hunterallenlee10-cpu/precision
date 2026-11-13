type TapeProps = {
  children: React.ReactNode;
  tilt?: "l" | "r";
  className?: string;
  as?: "span" | "p" | "div";
};

// A short strip of blue painter's tape used as a section label.
export function Tape({ children, tilt = "l", className = "", as: As = "span" }: TapeProps) {
  return <As className={`tape tape-label ${tilt === "r" ? "tape-tilt-r" : ""} ${className}`}>{children}</As>;
}

// A row of tape-measure ticks, used as a section divider.
export function Ticks({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`ticks w-full ${className}`} />;
}

type CornerTapeProps = {
  corner: "tl" | "tr" | "bl" | "br";
  className?: string;
  length?: number;
};

// A strip of tape across one corner of a photo, so the photo looks "taped up".
export function CornerTape({ corner, className = "", length = 96 }: CornerTapeProps) {
  const pos: Record<CornerTapeProps["corner"], React.CSSProperties> = {
    tl: { top: 10, left: -length * 0.28, transform: "rotate(-38deg)" },
    tr: { top: 10, right: -length * 0.28, transform: "rotate(38deg)" },
    bl: { bottom: 10, left: -length * 0.28, transform: "rotate(38deg)" },
    br: { bottom: 10, right: -length * 0.28, transform: "rotate(-38deg)" },
  };
  return (
    <span
      aria-hidden="true"
      className={`tape-strip z-10 ${className}`}
      style={{ width: length, ...pos[corner] }}
    />
  );
}
