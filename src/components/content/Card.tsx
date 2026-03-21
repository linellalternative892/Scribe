import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  href,
  icon,
  badge,
  external,
  className,
  children,
}: CardProps) {
  const isExternal = external || (href?.startsWith("http") ?? false);

  const content = (
    <>
      {/* Card header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm leading-snug">
                {title}
              </h3>
              {badge && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
        {href && (
          <div className="flex-shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors">
            {isExternal ? (
              <ExternalLink className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      {/* Custom content */}
      {children && (
        <div className="mt-3 text-sm text-muted-foreground">{children}</div>
      )}
    </>
  );

  const cardClasses = cn(
    "not-prose group rounded-xl border border-border bg-card p-5 transition-all duration-200",
    href && "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cardClasses}
      >
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
