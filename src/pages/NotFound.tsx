import useTitle from "@/hooks/useTitle";

const NotFoundPage = () => {
  useTitle("Not Found");

  return (
    <div className="text-center text-red-500">
      <h2 className="font-bold text-2xl">Ops!</h2>
      <h4 className="font-medium text-lg mt-2">Requested page not found</h4>
    </div>
  );
};

export default NotFoundPage;
