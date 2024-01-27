import { useLayoutEffect } from "react";

const useTitle = (title: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;

      return () => {
        document.title = "Smartphone Management";
      };
    }
  }, [title]);
};

export default useTitle;
