import { useCallback, useEffect } from 'react';

const useCloseSelectMenu = (elementArr, isSelectMenuOpen, cb) => {
  const closeSelectMenu = useCallback(
    (e) => {
      const x = elementArr?.every((element) => !element?.contains(e.target));
      const y = elementArr?.every((element) => e.target !== element);

      if (isSelectMenuOpen && x && y) {
        cb();
      }
    },
    [isSelectMenuOpen, elementArr],
  );

  useEffect(() => {
    window.addEventListener('click', closeSelectMenu);
    return () => {
      window.removeEventListener('click', closeSelectMenu);
    };
  }, [closeSelectMenu]);
};

export default useCloseSelectMenu;
