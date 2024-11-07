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

interface IListCard {
  title: string;
  description?: string;
  button?: React.ReactNode;
}

const ListCard: React.FC<IListCard> = ({
  title,
  description,
  button,
}): React.JSX.Element => {
  return (
    <div className="w-full mb-2">
      <AlertDialog>
        <Card className=" w-[600px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{description}</CardContent>
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
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListCard;
