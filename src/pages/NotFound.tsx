import useTitle from "@/hooks/useTitle";

const NotFoundPage = () => {
  useTitle("Not Found");

  return (
    <div>
      <h2>Ops!</h2>
      <h4>Requested page not found</h4>
    </div>
  );
};

export default NotFoundPage;
