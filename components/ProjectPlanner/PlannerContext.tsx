"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ProjectTypeId, PropertyTypeId } from "@/lib/services";

export type PlannerPreset = { project?: ProjectTypeId; property?: PropertyTypeId };

type PlannerCtx = {
  openPlanner: (preset?: PlannerPreset) => void;
};

const Ctx = createContext<PlannerCtx>({ openPlanner: () => {} });

// The modal is only downloaded when someone first asks for an estimate (or once the page is idle),
// so it never weighs on the first paint.
const PlannerModal = dynamic(() => import("./PlannerModal"), { ssr: false });

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preset, setPreset] = useState<PlannerPreset>({});
  const [session, setSession] = useState(0);

  const openPlanner = useCallback((p: PlannerPreset = {}) => {
    setPreset(p);
    setSession((s) => s + 1);
    setMounted(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const warm = () => void import("./PlannerModal");
    if (idle) idle(warm);
    else setTimeout(warm, 2500);
  }, []);

  const value = useMemo(() => ({ openPlanner }), [openPlanner]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted ? (
        <PlannerModal key={session} open={open} preset={preset} onClose={() => setOpen(false)} />
      ) : null}
    </Ctx.Provider>
  );
}

export const usePlanner = () => useContext(Ctx);
