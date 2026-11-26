import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
  icon?: LucideIcon;
  className?: string;
};

/** Pill button with an arrow disc that turns -45° on hover. */
export default function PillLink({ href, children, variant = "solid", size = "md", icon: Icon = ArrowUpRight, className }: Props) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full pr-2.5 pl-[22px] font-semibold transition-colors duration-250",
        size === "sm" ? "min-h-10 text-sm" : "min-h-12 text-[15px]",
        variant === "solid" ? "bg-blue text-white hover:bg-blue-hover" : "border border-line-2 text-sand hover:border-blue",
        className,
      )}
    >
      {children}
      <span className="grid size-[30px] place-items-center rounded-full bg-white/16 transition-transform duration-250 group-hover:-rotate-45">
        <Icon className="size-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
    </a>
  );
}
