import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListCard from "@/components/list-card";
import { useStoreActions } from "@/hooks/useEasyPeasy";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const List = (): React.JSX.Element => {
  const { fetchHome_Posts, fetchLibrary_Posts } = useStoreActions(
    (actions) => actions
  );

  React.useEffect(() => {
    fetchHome_Posts();
    fetchLibrary_Posts();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <Sheet>
        <Tabs
          defaultValue="home"
          className="w-full flex flex-col items-center justify-start pb-12 min-h-[400px]"
        >
          <TabsList className="mb-10 fixed">
            <TabsTrigger value="home">Home Posts</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="blog">Blog post</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <ListCard
              title="home"
              description="home post"
              button={
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-[100px] p-1">Edit</Button>
                </SheetTrigger>
              }
            />
            <ListCard title="home" description="home post" />
            <ListCard title="home" description="home post" />
            <ListCard title="home" description="home post" />
            <ListCard title="home" description="home post" />
          </TabsContent>
          <TabsContent value="library">
            <ListCard title="home" description="home post" />
            <ListCard title="home" description="home post" />
          </TabsContent>
          <TabsContent value="blog">
            <ListCard title="home" description="home post" />
            <ListCard title="home" description="home post" />
          </TabsContent>
        </Tabs>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default List;
