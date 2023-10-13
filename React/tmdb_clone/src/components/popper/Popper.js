import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { usePopper } from "react-popper";
import { Portal } from "../portal/Portal";

const Popper = forwardRef(
  ({ children, referenceElement, isSelectMenuOpen, width }, ref) => {
    //   const referenceElement = React.useRef();
    const popperElement = React.useRef();

    const { styles, attributes, update } = usePopper(
      referenceElement,
      popperElement.current,
      {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            enabled: true,
            options: {
              offset: [0, 0],
            },
          },
        ],
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
            className="select_menu_items_wrapper"
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
