import { cn } from "@/lib/utils";

interface CardGridProps {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

const COL_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function CardGrid({ cols = 2, children, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "not-prose my-6 grid gap-4",
        COL_CLASSES[cols],
        className
      )}
    >
      {children}
    </div>
  );
}
