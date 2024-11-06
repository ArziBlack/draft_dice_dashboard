import QuillEditor from "@/components/quill/quill";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { useStoreState } from "easy-peasy";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { StoreModel } from "../store/store";
import { homeSchema } from "@/schema/home.schema";
import { useStoreActions } from "@/hooks/useEasyPeasy";
import { IHome } from "@/store/types";
import useFirestore from "@/hooks/useFirestore";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Home = (): React.JSX.Element => {
  const {
    uploadImage,
    uploadProgress,
    url,
    handleImageChange,
    preview,
    isLoading,
  } = useFirestore();
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [_image] = useState<File | string | null>(url);
  const [imagePreview] = useState<string | null>(preview);
  const [content, setContent] = useState<string>("");
  const { createHomePost } = useStoreActions((actions) => actions);
  const { message, error, loading } = useStoreState(
    (state: StoreModel) => state
  );

  const handleContentChange = (value: string) => {
    setContent(value);
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
      console.log(url)
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      const payload: IHome = {
        title,
        description,
        content,
        image: _image,
      };
      console.log(payload);
      try {
        await createHomePost(payload).then((res:any) => console.log(res));
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error as string | "An unknown error occured",
          action: <ToastAction altText="Retry Upload">Retry</ToastAction>,
        });
        console.error("Error submitting form:", error);
      }
      console.log("Form submitted:", { title, description, _image, content });
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Validation errors",
      });
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
              onChange={handleImageChange}
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
            <Button
              variant="secondary"
              className="mt-4 w-[300px]"
              disabled={isLoading}
              onClick={()=> uploadImage("home")}
            >
              {!isLoading ? (
                "Upload Image"
              ) : (
                <Progress value={uploadProgress} className="w-[100%]" />
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Check />}
            Upload Home Post
          </Button>
        </CardFooter>
      </Card>
    </ViewCard>
  );
};

export default Home;
