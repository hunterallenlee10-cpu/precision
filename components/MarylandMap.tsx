import { anneArundelPath, countyLinesPath, MAP_H, MAP_W, marylandPath, placeDots } from "@/lib/maryland-map";
import { business } from "@/lib/business";

const labelPos: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  Pasadena: { dx: 14, dy: 8, anchor: "start" },
  Baltimore: { dx: -10, dy: -8, anchor: "end" },
  Frederick: { dx: 0, dy: -14, anchor: "middle" },
  "Ocean City": { dx: -12, dy: 7, anchor: "end" },
  "Washington, D.C.": { dx: -12, dy: 22, anchor: "end" },
};

// A simple outlined map of Maryland with Anne Arundel County lit. The places are also written out as text.
export function MarylandMap() {
  return (
    <div className="grid gap-6">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        role="img"
        aria-labelledby="md-map-title"
        className="h-auto w-full"
      >
        <title id="md-map-title">Map of Maryland with Anne Arundel County, home of our Pasadena shop, highlighted</title>
        <path d={marylandPath} fill="#ffffff" stroke="#0c1420" strokeWidth={1.5} strokeLinejoin="round" />
        <path d={countyLinesPath} fill="none" stroke="#dad6cb" strokeWidth={0.8} />
        <path d={anneArundelPath} fill="#1c93e6" stroke="#0c1420" strokeWidth={1.25} strokeLinejoin="round" />
        {Object.entries(placeDots).map(([name, [x, y]]) => {
          const l = labelPos[name];
          const home = name === "Pasadena";
          return (
            <g key={name}>
              <rect
                x={x - (home ? 7 : 5)}
                y={y - (home ? 7 : 5)}
                width={home ? 14 : 10}
                height={home ? 14 : 10}
                fill="#0c1420"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <text
                x={x + l.dx}
                y={y + l.dy}
                textAnchor={l.anchor}
                fontSize={home ? 24 : 19}
                fontWeight={home ? 700 : 600}
                fill="#0c1420"
                stroke="#f3f1ea"
                strokeWidth={5}
                paintOrder="stroke"
                fontFamily="var(--font-plex), system-ui, sans-serif"
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
      <div>
        <h3 className="display-caps text-[12px]">Where we work</h3>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[16px]">
          {business.serviceArea.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${p === "Anne Arundel County" ? "bg-tape outline outline-1 outline-ink" : "bg-ink"}`} />
              {p}
            </li>
          ))}
          <li className="flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="h-px w-2.5 shrink-0 bg-ink" />
            and across Maryland
          </li>
        </ul>
      </div>
    </div>
  );
}
