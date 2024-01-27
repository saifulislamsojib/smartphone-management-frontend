import { cn } from "@/lib/utils";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn("flex items-center justify-center min-h-screen", className)}
    >
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>
  );
};

export default Loading;
