import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplyButtonProps {
  href: string;
  className?: string;
}

export function ApplyButton({ href, className }: ApplyButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-full border border-white/20 text-white text-sm px-5 py-2.5 h-auto transition-colors duration-300 hover:border-purple-500/50",
        className
      )}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Apply now
      </span>
      <i
        className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/4 place-items-center transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white"
        style={{ background: 'linear-gradient(135deg, #f97316, #a855f7)' }}
      >
        <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      </i>
    </a>
  );
}
