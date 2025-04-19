import React from "react";
import { useStoreState } from "easy-peasy";
import { StoreModel } from "../store/store";
import { homeSchema } from "@/schema/home.schema";
import { useStoreActions } from "@/hooks/useEasyPeasy";
import { IHome } from "@/store/types";
import useFirestore from "@/hooks/useFirestore";
import PostForm, { PostFormData } from "@/components/forms/post-form";

const Home = (): React.JSX.Element => {
  const firestore = useFirestore();
  const { createHomePost } = useStoreActions((actions) => actions);
  const { message, loading } = useStoreState(
    (state: StoreModel) => state
  );

  const validateFields = (data: PostFormData) => {
    const result = homeSchema.safeParse({
      title: data.title,
      description: data.description,
      _image: data.image,
      content: data.content,
    });

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      console.log("Validation errors:", errorMessages);
      return false;
    }
    return true;
  };

  const handleSubmit = async (data: PostFormData) => {
    const payload: IHome = {
      title: data.title,
      description: data.description,
      content: data.content,
      image: data.image,
    };
    
    return await createHomePost(payload);
  };

  return (
    <PostForm
      title="Create Post for the Home Page"
      description="Control the Home page by filling out the necessary fields"
      onSubmit={handleSubmit}
      loading={loading}
      validateFields={validateFields}
      useFirestore={firestore}
      successMessage={message || "Home post created successfully"}
      uploadFolder="home"
    />
  );
};

export default Home;
