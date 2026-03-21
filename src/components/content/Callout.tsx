import { Info, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "danger" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_STYLES: Record<
  CalloutType,
  { container: string; icon: React.ElementType; iconClass: string; title: string }
> = {
  info: {
    container: "border-blue-500/30 bg-blue-500/8 dark:bg-blue-500/10",
    icon: Info,
    iconClass: "text-blue-500",
    title: "Note",
  },
  warning: {
    container: "border-amber-500/30 bg-amber-500/8 dark:bg-amber-500/10",
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    title: "Warning",
  },
  success: {
    container: "border-emerald-500/30 bg-emerald-500/8 dark:bg-emerald-500/10",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    title: "Success",
  },
  danger: {
    container: "border-red-500/30 bg-red-500/8 dark:bg-red-500/10",
    icon: XCircle,
    iconClass: "text-red-500",
    title: "Danger",
  },
  tip: {
    container: "border-violet-500/30 bg-violet-500/8 dark:bg-violet-500/10",
    icon: Lightbulb,
    iconClass: "text-violet-500",
    title: "Tip",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = CALLOUT_STYLES[type];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        styles.container
      )}
      role={type === "danger" || type === "warning" ? "alert" : "note"}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", styles.iconClass)} aria-hidden />
      <div className="flex-1 min-w-0">
        {title ? (
          <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        ) : (
          <p className="font-semibold text-foreground text-sm mb-1">{styles.title}</p>
        )}
        <div className="text-sm text-muted-foreground [&>p]:m-0 [&>p+p]:mt-2 [&>ul]:mt-2 [&>ul]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
