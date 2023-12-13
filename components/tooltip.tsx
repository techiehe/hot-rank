import { cn } from "@/lib/utils";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingArrow,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useHover,
  arrow,
  useFocus,
} from "@floating-ui/react";
import { useState } from "react";
import React from "react";

export const TooltipString = ({
  tooltip: { placement = "top", className = "", content },
  children,
}: {
  tooltip: {
    placement?: "top" | "bottom" | "left" | "right";
    className?: string;
    content: React.ReactNode;
  };
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={cn(
            "bg-primary text-primary-foreground shadow hover:bg-primary/90 px-2 py-1 text-sm rounded-md z-[99999]",
            className
          )}
          {...getFloatingProps()}>
          {content}
        </div>
      )}
    </>
  );
};
