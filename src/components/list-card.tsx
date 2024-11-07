import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface IListCard {
  title: string;
  description?: string;
}

const ListCard: React.FC<IListCard> = ({
  title,
  description,
}): React.JSX.Element => {
  return (
    <div className="w-full mb-2">
      <Card className=" w-[600px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
        <CardFooter className="flex w-full justify-between my-2">
          <Button variant="secondary" className="w-[100px] p-1">
            view
          </Button>
          <Button variant="secondary" className="w-[100px] p-1">edit</Button>
          <Button variant="destructive" className="w-[100px] p-1">delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListCard;
