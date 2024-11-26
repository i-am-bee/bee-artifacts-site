'use client';

import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';

interface Props {
  content: ReactNode;
  placement?: Placement;
  asChild?: boolean;
}

export function Tooltip({
  content,
  placement = 'bottom',
  asChild,
  children,
}: PropsWithChildren<Props>) {
  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(ARROW_SIZE + OFFSET),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const Comp = asChild ? Slot : 'button';

  return (
    <>
      <Comp ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Comp>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50"
            {...getFloatingProps()}
          >
            <div className="text-light bg-layer-inverse max-w-64 rounded-2 p-2 text-14">
              {content}
            </div>

            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={ARROW_SIZE}
              height={ARROW_SIZE}
              className="fill-layer-inverse"
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

const ARROW_SIZE = 8;
const OFFSET = 4;
