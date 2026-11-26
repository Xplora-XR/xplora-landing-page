import Image from "next/image";

/** Official lockup, trimmed from public/Images/Xplora.webp (876×214). */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex shrink-0 ${className}`}>
      <Image src="/Images/xplora-logo.webp" alt="Xplora — início" width={876} height={214} priority className="h-[30px] w-auto" />
    </a>
  );
}
