import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import QuillEditor from "@/components/quill/quill";
import ViewCard from "@/components/ViewCard";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { IFirebaseError } from "@/interfaces/errors";
import { ChangeEvent } from "react";

export interface PostFormProps {
  title: string;
  description: string;
  onSubmit: (data: PostFormData) => Promise<any>;
  loading: boolean;
  validateFields?: (data: PostFormData) => boolean;
  useFirestore: {
    firebaseError?: IFirebaseError;
    uploadProgress: number;
    url: string;
    preview: string | null;
    image: File | null;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    uploadImage: (folder: string) => void;
    message?: string | null;
    fileSizeLimit?: number;
    fileSize?: number;
    isLoading: boolean;
  };
  successMessage?: string;
  uploadFolder: string;
}

export interface PostFormData {
  title: string;
  description: string;
  content: string;
  image: string;
}

const PostForm: React.FC<PostFormProps> = ({
  title,
  description,
  onSubmit,
  loading,
  validateFields,
  useFirestore: { uploadProgress, url, handleImageChange, preview, uploadImage, isLoading },
  successMessage = "Post created successfully",
  uploadFolder
}) => {
  const { toast } = useToast();
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData: PostFormData = {
      title: formTitle,
      description: formDescription,
      content,
      image: url,
    };

    if (validateFields && !validateFields(formData)) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please fill all required fields",
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: successMessage,
      });
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
    }
  };

  return (
    <ViewCard className="overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-start h-full items-start">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of the post"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full mt-5">
            <Label htmlFor="desc" className="text-left">
              Description
            </Label>
            <Input
              id="desc"
              placeholder="Description of the post"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
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
            {preview && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={preview}
                  alt="Selected"
                  className="max-w-[450px] h-auto rounded-lg shadow-md"
                />
              </div>
            )}
            <Button
              variant="secondary"
              className="mt-4 w-[300px]"
              disabled={isLoading}
              onClick={() => uploadImage(uploadFolder)}
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
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" />}
            Submit Post
          </Button>
        </CardFooter>
      </Card>
    </ViewCard>
  );
};

export default PostForm;
