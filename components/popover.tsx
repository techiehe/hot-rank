import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useHover,
} from "@floating-ui/react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

export function Popover({
  trigger,
  children,
  hoverEnabled = false,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  hoverEnabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const hover = useHover(context, {
    enabled: hoverEnabled,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <Card
            className="rounded-lg shadow-xl z-[555555]"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}>
            <CardContent className="p-0">{children}</CardContent>
          </Card>
        </FloatingFocusManager>
      )}
    </>
  );
}
