import { useEffect, useRef } from "react";
import { toast } from "sonner";

const useRefetchToast = (isFetching: boolean, isLoading: boolean) => {
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isFetching && !isLoading) {
      toastIdRef.current = toast.loading("Loading...", { duration: 500000 });
    } else if (toastIdRef.current && !isFetching) {
      toast.dismiss(toastIdRef.current);
    }
  }, [isFetching, isLoading]);
};

export default useRefetchToast;
