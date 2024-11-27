import * as React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }) => children;

const TooltipContext = React.createContext({});

const Tooltip = ({ children, delayDuration = 200 }) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef();

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ open, showTooltip, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const { showTooltip, hideTooltip } = React.useContext(TooltipContext);
    const Child = asChild ? React.Children.only(children) : "span";

    return React.cloneElement(Child, {
      ...props,
      ref,
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
    });
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open } = React.useContext(TooltipContext);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 px-2 py-1 text-xs rounded-md bg-primary text-primary-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
