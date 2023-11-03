import { useCallback, useEffect } from "react";

const useCloseSelectMenu = (elementArr, isSelectMenuOpen, cb) => {
  const closeSelectMenu = useCallback(
    (e) => {
      elementArr?.every((element) => {
        console.log("element", element, element?.contains(e.target));
        return !element?.contains(e.target);
      });
      const x = elementArr?.some((element) => element?.contains(e.target));
      const y = elementArr?.every((element) => e.target === element);
      // if (isSelectMenuOpen && x) {
      //   cb();
      // }
      if (
        isSelectMenuOpen &&
        (!elementArr[0]?.contains(e.target) ||
          !elementArr[1]?.contains(e.target)) &&
        e.target !== elementArr[0] &&
        e.target !== elementArr[1]
      ) {
        console.log("Inside");
        
        cb();
      }
      console.log("target--->", e.target, elementArr);
      console.log("isSelectMenuOpen--->", isSelectMenuOpen);
      console.log(
        "X--->",
        elementArr[0]?.contains(e.target),
        elementArr[1]?.contains(e.target)
      );
      console.log("Y--->", e.target !== elementArr[0], e.target !== elementArr[1]);
    },
    [isSelectMenuOpen]
  );

  // useEffect(() => {
  //   window.addEventListener("click", closeSelectMenu);
  //   return () => {
  //     window.removeEventListener("click", closeSelectMenu);
  //   };
  // }, [closeSelectMenu]);
};

export default useCloseSelectMenu;
