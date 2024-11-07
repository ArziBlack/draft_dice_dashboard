import ToastDemo from "@/components/button";
import ViewCard from "@/components/ViewCard";
import Loader from "./loader";

const Blogger = (): React.JSX.Element => {
  let load = true;
  if (load) {
    return <Loader />;
  }
  return (
    <ViewCard>
      Blogger
      <ToastDemo
        title="New Notification"
        description="Your action was successful."
        actionLabel="Undo"
        onActionClick={() => console.log("Undo clicked")}
      />
    </ViewCard>
  );
};

export default Blogger;
