import { MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { EstimateButton } from "./EstimateButton";

// Mobile only: always-visible Call, Text and Free Estimate.
export function MobileBar() {
  return (
    <div className="on-ink fixed inset-x-0 bottom-0 z-30 border-t border-ink-line bg-ink pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2 p-2">
        <a href={business.telHref} className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[2px] border border-ink-line text-[13px] font-semibold text-ink-paper">
          <Phone aria-hidden="true" size={18} strokeWidth={2} />
          Call
        </a>
        <a href={business.smsHref} className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[2px] border border-ink-line text-[13px] font-semibold text-ink-paper">
          <MessageSquare aria-hidden="true" size={18} strokeWidth={2} />
          Text
        </a>
        <EstimateButton label="Free Estimate" ariaLabel="Get My Free Estimate" className="!min-h-[52px] !px-3 text-[15px]" arrow={false} />
      </div>
    </div>
  );
}
