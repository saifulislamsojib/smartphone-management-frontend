import { useLayoutEffect } from "react";

const useTitle = (title: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = `${title} - Smartphone Management`;

      return () => {
        document.title = "Smartphone Management";
      };
    }
  }, [title]);
};

export default useTitle;
