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
import { useStoreActions, useStoreState } from "@/hooks/useEasyPeasy";
import { Loader2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";

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
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }
  const { deleteHome_Post, deleteLibrary_Post } = useStoreActions(
    (actions) => actions
  );
  const { loading } = useStoreState((state) => state);

  const handleDelete = async () => {
    try {
      if (view === "home" && id) {
        await deleteHome_Post(id);
      } else if (view === "library" && id) {
        await deleteLibrary_Post(id);
      }
      console.log("Delete successful");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="w-full mb-2">
      {/* <Sheet> */}
      {/* <Drawer> */}
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
            <DrawerTrigger asChild>
              <Button variant="secondary" className="w-[100px] p-1">
                View
              </Button>
            </DrawerTrigger>
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
            <AlertDialogAction
              disabled={loading}
              onClick={() => {
                console.log("Delete button clicked");
                handleDelete();
              }}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Edit Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(-10)}
                    disabled={goal <= 200}
                  >
                    <Minus />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {goal}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Calories/day
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(10)}
                    disabled={goal >= 400}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mt-3 h-[120px]"> */}
      {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar
                      dataKey="goal"
                      style={
                        {
                          fill: "hsl(var(--foreground))",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer> */}
      {/*</div> */}
      {/* <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter> */}
      {/* </div> */}
      {/* </DrawerContent> */}
      {/* </Drawer> */}
      {/*</Sheet>*/}
    </div>
  );
};

export default ListCard;
