import QuillEditor from "@/components/quill/quill";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ViewCard from "@/components/ViewCard";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { StoreModel } from "../store/store";
import { homeSchema } from "@/schema/home.schema";

const Home = (): React.JSX.Element => {
  const [title, setTitle] = useState<string | null>("");
  const [description, setDescription] = useState<string>("");
  const [_image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const { createHome_Post } = useStoreActions((actions: StoreModel) => actions);
  const { message, error, loading } = useStoreState(
    (state: StoreModel) => state
  );

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateFields = () => {
    const result = homeSchema.safeParse({
      title,
      description,
      _image,
      content,
    });

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      console.log("Validation errors:", errorMessages);
      return false;
    }
    return true;
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      await createHome_Post({ title, description, content, image: _image });
      console.log("Form submitted:", { title, description, _image, content });
    } else {
      console.log("Form submission failed due to validation errors.");
    }
  };
  return (
    <ViewCard className=" overflow-scroll">
      <Card>
        <CardHeader>
          <CardTitle>Create Post for the Home Page</CardTitle>
          <CardDescription>
            Control the Home page by filling out the necessary fields
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-start h-full items-start">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of the post"
              value={title as string}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full mt-5">
            <Label htmlFor="desc" className="text-left">
              Description
            </Label>
            <Input
              id="desc"
              placeholder="Description of the post"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4 w-full flex flex-col">
            <Label htmlFor="content" className="text-left">
              Content
            </Label>
            <QuillEditor
              content={content}
              handleContentChange={handleContentChange}
            />
          </div>
          <div className="flex flex-col mt-4 w-full">
            <Label htmlFor="image" className="text-left py-3">
              Image
            </Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="max-w-[450px] h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Upload Home Post
          </Button>
        </CardFooter>
      </Card>
    </ViewCard>
  );
};

export default Home;
