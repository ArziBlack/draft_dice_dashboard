import React, { useEffect, useState } from "react";
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
} from "@/components/ui/drawer";
import { FileText, Library, Newspaper, Plus, Search } from "lucide-react";
import ViewCard from "@/components/ViewCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const List = (): React.JSX.Element => {
  const [view, setView] = useState<string>("home");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const { fetchHome_Posts, fetchLibrary_Posts } = useStoreActions(
    (actions) => actions
  );
  
  const { home_post, library_post } = useStoreState((state) => state);

  useEffect(() => {
    fetchHome_Posts();
    fetchLibrary_Posts();
  }, [fetchHome_Posts, fetchLibrary_Posts]);

  // Filter posts based on search term
  const filteredHomePosts = home_post?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredLibraryPosts = library_post?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabItems = [
    { value: "home", label: "Home Posts", icon: <FileText className="h-4 w-4 mr-2" /> },
    { value: "library", label: "Library", icon: <Library className="h-4 w-4 mr-2" /> },
    { value: "blog", label: "Blog Posts", icon: <Newspaper className="h-4 w-4 mr-2" /> }
  ];

  return (
    <ViewCard>
      <div className="container mx-auto py-6 space-y-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your posts and content from one place
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="home"
          onValueChange={(value) => setView(value)}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="bg-transparent h-12">
              {tabItems.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4"
                >
                  <div className="flex items-center">
                    {tab.icon}
                    {tab.label}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="home" className="mt-6">
            <Sheet>
              {filteredHomePosts && filteredHomePosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredHomePosts.map((item, idx) => (
                    <ListCard
                      key={idx}
                      view={view}
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      button={
                        <SheetTrigger asChild>
                          <Button variant="secondary">
                            Edit
                          </Button>
                        </SheetTrigger>
                      }
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardHeader className="text-center">
                    <CardTitle>No Home Posts Found</CardTitle>
                    <CardDescription>
                      {searchTerm ? "No posts match your search criteria" : "Create your first home post to get started"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Home Post
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Edit Home Post</SheetTitle>
                  <SheetDescription>
                    Make changes to your home post here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Post title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Post description" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </TabsContent>

          <TabsContent value="library" className="mt-6">
            <Sheet>
              {filteredLibraryPosts && filteredLibraryPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLibraryPosts.map((item, idx) => (
                    <ListCard
                      key={idx}
                      view={view}
                      id={item?._id}
                      title={item?.title}
                      video={item?.video_id as string}
                      button={
                        <SheetTrigger asChild>
                          <Button variant="secondary">
                            Edit
                          </Button>
                        </SheetTrigger>
                      }
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardHeader className="text-center">
                    <CardTitle>No Library Posts Found</CardTitle>
                    <CardDescription>
                      {searchTerm ? "No posts match your search criteria" : "Create your first library post to get started"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Library Post
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Edit Library Post</SheetTitle>
                  <SheetDescription>
                    Make changes to your library post here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Post title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="video">Video ID</Label>
                    <Input id="video" placeholder="YouTube video ID" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <Drawer>
              <Card className="border-dashed">
                <CardHeader className="text-center">
                  <CardTitle>Blog Posts Coming Soon</CardTitle>
                  <CardDescription>
                    This feature is currently under development
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button disabled>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Blog Post
                  </Button>
                </CardContent>
              </Card>
              
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Blog Post</DrawerTitle>
                  <DrawerDescription>
                    Make changes to your blog post here.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Blog post title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Input id="content" placeholder="Blog post content" />
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Save changes</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </TabsContent>
        </Tabs>
      </div>
    </ViewCard>
  );
};

export default List;
