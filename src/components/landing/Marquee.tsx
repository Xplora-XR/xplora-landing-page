import { cn } from "@/lib/utils";

/** Infinite horizontal loop: renders the items twice and slides by half. */
export default function Marquee({ children, reverse = false, className }: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className={cn("flex w-max motion-safe:animate-marquee", reverse && "[animation-direction:reverse]", className)}>
        {children}
        <div aria-hidden="true" className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}
