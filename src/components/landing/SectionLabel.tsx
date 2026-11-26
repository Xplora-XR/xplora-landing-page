import { cn } from "@/lib/utils";

/** Mono section tag with a leading rule, e.g. "[ 01 ] Sobre". */
export default function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={cn("mono-label mb-7 flex items-center gap-3 text-blue", center && "justify-center")}>
      <span aria-hidden="true" className="h-px w-7 bg-blue" />
      {children}
      {center && <span aria-hidden="true" className="h-px w-7 bg-blue" />}
    </div>
  );
}
