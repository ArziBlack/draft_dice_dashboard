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
import { Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import useFirestore from "@/hooks/useFirestore";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Progress } from "@/components/ui/progress";
import { useStoreActions, useStoreState } from "@/hooks/useEasyPeasy";
import { librarySchema } from "@/schema/library.schema";
import { ILibrary } from "@/store/types";

const Library = (): React.JSX.Element => {
  const {
    handleImageChange,
    preview,
    isLoading,
    uploadProgress,
    uploadImage,
    url,
  } = useFirestore();
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [video_id, setVideoId] = useState<string | null>(null);
  const { createLibraryPosts } = useStoreActions((actions) => actions);
  const { loading } = useStoreState((state) => state);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const validateFields = () => {
    const result = librarySchema.safeParse({
      title,
      video_id,
      content,
      url,
    });

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      console.log("Validation errors:", errorMessages);
      return false;
    }
    return true;
  };

  const extractVideoId = (vid_url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)?([^&]{11})|youtu\.be\/([^&]{11})/;
    const match = vid_url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handleVideoUrlChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const vid_url = e.target.value;
    setVideoUrl(vid_url);
    const id = extractVideoId(vid_url);

    if (id) {
      setVideoId(id);
      console.log(id);
    } else {
      toast({
        title: "invalid url",
        variant: "destructive",
        description: "cannot extract video id from url",
        action: <ToastAction altText="Retry Extract">Retry</ToastAction>,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      const payload: ILibrary = {
        title,
        video_id,
        content,
        image: url,
      };

      try {
        await createLibraryPosts(payload).then((res: any) =>
          toast({
            title: "success",
            description: res.message,
          })
        );
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error as string | "An unknown error occured",
          action: <ToastAction altText="Retry Upload">Retry</ToastAction>,
        });
      }
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Validation errors",
      });
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
            <Input
              id="title"
              placeholder="Title of the post"
              value={title as string}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4 w-full space-y-1.5">
            <Label htmlFor="videoUrl" className="text-left">
              YouTube Video URL
            </Label>
            <Input
              id="videoUrl"
              placeholder="Paste YouTube video URL here"
              value={videoUrl}
              onChange={handleVideoUrlChange}
            />
            {video_id && (
              <div className="mt-4 w-full flex justify-center">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video_id}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            )}
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
              onClick={() => uploadImage("home")}
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
            {loading ? <Loader2 className="animate-spin" /> : <Check />} Upload
            Library Post
          </Button>
        </CardFooter>
      </Card>
    </ViewCard>
  );
};

export default Library;
