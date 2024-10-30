import QuillEditor from "@/components/quill/quill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ViewCard from "@/components/ViewCard";
import React, { useState } from "react";

const Library = (): React.JSX.Element => {
  const [_image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  // console.log(content)

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
  return (
    <ViewCard className=" overflow-scroll">
      <Card>
        <CardHeader>
          <CardTitle>Create Post for the Library Page</CardTitle>
          <CardDescription>
            Control the Library page by filling out the necessary fields
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-start h-full items-start">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input id="title" placeholder="Title of the post" />
          </div>
          <div className="flex flex-col space-y-1.5 w-full mt-5">
            <Label htmlFor="video" className="text-left">
              Video
            </Label>
            <Input id="video" placeholder="Video id for the video" />
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
            <Label htmlFor="thumbnail" className="text-left py-3">
              Thumbnail
            </Label>
            <Input
              type="file"
              id="thumpbnail"
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
        <Input />
      </Card>
    </ViewCard>
  );
};

export default Library;
