import ToastDemo from "@/components/button";
import ViewCard from "@/components/ViewCard";

const Blogger = (): React.JSX.Element => {
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
