import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Loader2, Eye, Trash2, Calendar, Clock } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IListCard {
  id: string;
  title: string;
  description?: string;
  video?: string;
  view?: string;
  video_id?: string;
  button?: React.ReactNode;
  handleVideoUrlChange?: () => void;
  createdAt?: string;
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
  createdAt,
}): React.JSX.Element => {
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

  // Format date if available, or use placeholder
  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Unknown date';

  return (
    <AlertDialog>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold line-clamp-1">{title}</CardTitle>
              {view && (
                <Badge variant="outline" className="mt-1">
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Badge>
              )}
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>ED</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          {description && (
            <CardDescription className="line-clamp-2 text-sm text-muted-foreground mb-4">
              {description}
            </CardDescription>
          )}
          
          {video && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="videoUrl" className="text-sm font-medium">
                  YouTube Video
                </Label>
                <Badge variant="secondary" className="text-xs">Video</Badge>
              </div>
              
              <div className="relative">
                <Input
                  id="videoUrl"
                  placeholder="Paste YouTube video URL here"
                  value={video}
                  onChange={handleVideoUrlChange}
                  className="pr-10"
                />
                <Eye className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              
              {(video_id || video) && (
                <div className="mt-4 w-full aspect-video rounded-md overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-sm"
                  ></iframe>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
            <Clock className="h-3 w-3 ml-2" />
            <span>Last updated: Today</span>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 gap-2">
          <div className="flex gap-2">
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </DrawerTrigger>
            {button}
          </div>
          
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
        </CardFooter>
      </Card>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={() => {
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListCard;
