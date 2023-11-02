import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { usePopper } from "react-popper";
import { Portal } from "../portal/Portal";

const Popper = forwardRef(
  ({ children, referenceElement, isSelectMenuOpen, width, className }, ref) => {
    const popperElement = useRef();
    
    const modifiers = useMemo(
      () => [
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
          phase: "beforeWrite",
          requires: ["computeStyles"],
        },
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 0],
          },
        },
      ],
      []
    );

    const { styles, attributes, update } = usePopper(
      referenceElement,
      popperElement.current,
      {
        placement: "bottom-start",
        modifiers,
      }
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          update,
        };
      },
      [update]
    );
    return (
      <div>
        <Portal>
          <div
            ref={popperElement}
            className={`select_menu_items_wrapper ${
              className === "popperTrailer" ? "popperTrailer" : ""
            }`}
            style={{
              display: isSelectMenuOpen ? "block" : "none",
              width: width,
              ...styles.popper,
            }}
            {...attributes.popper}
          >
            {children}
          </div>
        </Portal>
      </div>
    );
  }
);

export default Popper;
