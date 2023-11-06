import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { usePopper } from "react-popper";
import { Portal } from "../portal/Portal";
import useCloseSelectMenu from "../../hooks/useCloseSelectMenu";

const Popper = forwardRef(
  (
    {
      children,
      referenceElement,
      isSelectMenuOpen,
      setIsSelectMenuOpen = () => {},
      width,
      className,
    },
    ref
  ) => {
    const [popperElement, setPopperElement] = useState(null);

    const modifiers = useMemo(
      () => [
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state }) => {
            if (width) {
              state.styles.popper.width = "300px";
            } else {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            }
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
      [width]
    );

    const { styles, attributes, update } = usePopper(
      referenceElement,
      popperElement,
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

    useCloseSelectMenu(
      [referenceElement, popperElement],
      isSelectMenuOpen,
      () => setIsSelectMenuOpen(!isSelectMenuOpen)
    );

    return (
      <div>
        <Portal>
          <div
            ref={setPopperElement}
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
