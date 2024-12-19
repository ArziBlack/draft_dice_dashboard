import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListCard from "@/components/list-card";
import { useStoreActions, useStoreState } from "@/hooks/useEasyPeasy";
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

const List = (): React.JSX.Element => {
  const [view, setView] = React.useState<string>("home");
  const { fetchHome_Posts, fetchLibrary_Posts } = useStoreActions(
    (actions) => actions
  );
  const { home_post, library_post } = useStoreState((state) => state);

  console.log(view);
  console.log(home_post);
  console.log(library_post);
  React.useEffect(() => {
    fetchHome_Posts();
    fetchLibrary_Posts();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <Drawer>
        <Sheet>
          <Tabs
            defaultValue="home"
            onValueChange={(value) => setView(value)}
            className="w-full flex flex-col items-center justify-start pb-12 min-h-[400px]"
          >
            <TabsList className="mb-10 fixed">
              <TabsTrigger value="home">Home Posts</TabsTrigger>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="blog">Blog post</TabsTrigger>
            </TabsList>
            <TabsContent value="home">
              {home_post?.map((item, idx) => (
                <ListCard
                  key={idx}
                  view={view}
                  id={item?._id}
                  title={item?.title}
                  description={item?.description}
                  button={
                    <SheetTrigger asChild>
                      <Button variant="secondary" className="w-[100px] p-1">
                        Edit
                      </Button>
                    </SheetTrigger>
                  }
                />
              ))}
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit home</SheetTitle>
                  <SheetDescription>
                    Make changes to your home post here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </TabsContent>
            <TabsContent value="library">
              {library_post?.map((item, idx) => (
                <ListCard
                  key={idx}
                  view={view}
                  id={item?._id}
                  title={item?.title}
                  video={item?.video_id as string}
                  button={
                    <SheetTrigger asChild>
                      <Button variant="secondary" className="w-[100px] p-1">
                        Edit
                      </Button>
                    </SheetTrigger>
                  }
                />
              ))}
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit library</SheetTitle>
                  <SheetDescription>
                    Make changes to your library post here. Click save when
                    you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </TabsContent>
            <TabsContent value="blog">
              <ListCard
                id="5"
                title={view}
                view={view}
                description="home post"
                button={
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-[100px] p-1">
                      Edit
                    </Button>
                  </SheetTrigger>
                }
              />
              <ListCard
                id="6"
                title={view}
                description="blog post"
                button={
                  <DrawerTrigger asChild>
                    <Button variant="secondary" className="w-[100px] p-1">
                      Edit
                    </Button>
                  </DrawerTrigger>
                }
              />
              {/* <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit library</SheetTitle>
                  <SheetDescription>
                    Make changes to your library post here. Click save when
                    you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      hello
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent> */}
              <DrawerContent>
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
                        onClick={() => {}}
                        disabled={false}
                      >
                        <Minus />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter">
                          {"goal"}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          Calories/day
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => {}}
                        disabled={true}
                      >
                        <Plus />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                    <div className="mt-3 h-[120px]"></div>
                  </div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </TabsContent>
          </Tabs>
        </Sheet>
      </Drawer>
    </div>
  );
};

export default List;
