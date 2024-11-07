import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useStoreActions } from "@/hooks/useEasyPeasy";

interface IListCard {
  id: string;
  title: string;
  description?: string;
  video?: string;
  view?: string;
  //   setView?: React.Dispatch<React.SetStateAction<string>>;
  video_id?: string;
  button?: React.ReactNode;
  handleVideoUrlChange?: () => void;
}

const ListCard: React.FC<IListCard> = ({
  id,
  view,
  title,
  description,
  button,
  video,
  video_id,
  handleVideoUrlChange,
}): React.JSX.Element => {
  const { deleteHome_Post, deleteLibrary_Post } = useStoreActions(
    (actions) => actions
  );

  const handleDelete = async () => {
    if (view === "home") {
      await deleteHome_Post(id).then((res: any) => console.log(res));
    } else if (view === "library") {
      await deleteLibrary_Post(id).then((res: any) => console.log(res));
    }
  };

  return (
    <div className="w-full mb-2">
      <AlertDialog>
        <Card className=" w-[600px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {description}
            {video && (
              <div className="flex flex-col mt-4 w-full space-y-1.5">
                <Label htmlFor="videoUrl" className="text-left">
                  YouTube Video URL
                </Label>
                <Input
                  id="videoUrl"
                  placeholder="Paste YouTube video URL here"
                  value={video}
                  onChange={handleVideoUrlChange}
                />
                {video_id ||
                  (video && (
                    <div className="mt-4 w-full flex justify-center">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video}`}
                        title="YouTube video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-md"
                      ></iframe>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex w-full justify-between my-2">
            <Button variant="secondary" className="w-[100px] p-1">
              view
            </Button>
            {button}
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-[100px] p-1">
                Delete
              </Button>
            </AlertDialogTrigger>
          </CardFooter>
        </Card>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListCard;
