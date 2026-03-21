import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

interface StepsProps {
  steps: Step[];
  className?: string;
}

export function Steps({ steps, className }: StepsProps) {
  return (
    <div className={cn("not-prose my-6 space-y-0", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-5">
          {/* Step indicator column */}
          <div className="flex flex-col items-center">
            {/* Number circle */}
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
              {index + 1}
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="w-px flex-1 bg-border my-1" />
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              "flex-1 min-w-0",
              index < steps.length - 1 ? "pb-8" : "pb-2"
            )}
          >
            <h3 className="text-base font-semibold text-foreground mt-1 mb-1.5">
              {step.title}
            </h3>
            {step.description && (
              <p className="text-sm text-muted-foreground mb-3">
                {step.description}
              </p>
            )}
            {step.children && (
              <div className="text-sm text-muted-foreground [&>div.not-prose]:mt-3">
                {step.children}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Step component for MDX usage where you build steps declaratively
interface StepProps {
  title: string;
  children: React.ReactNode;
}

// StepGroup wraps Step children and renders them with connectors
export function StepGroup({ children }: { children: React.ReactNode }) {
  const childArray = Array.isArray(children) ? children : [children];
  const count = childArray.length;

  return (
    <div className="not-prose my-6 space-y-0">
      {childArray.map((child, index) => (
        <div key={index} className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
              {index + 1}
            </div>
            {index < count - 1 && (
              <div className="w-px flex-1 bg-border my-1" />
            )}
          </div>
          <div className={cn("flex-1 min-w-0", index < count - 1 ? "pb-8" : "pb-2")}>
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Step({ title, children }: StepProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mt-1 mb-2">{title}</h3>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
