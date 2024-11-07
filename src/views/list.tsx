import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListCard from "@/components/list-card";

const List = (): React.JSX.Element => {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <Tabs
        defaultValue="home"
        className="w-full flex flex-col items-center justify-start pb-12 min-h-[400px]"
      >
        <TabsList className="mb-10">
          <TabsTrigger value="home">Home Posts</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="blog">Blog post</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <ListCard title="home" description="home post" />
          <ListCard title="home" description="home post"/>
        </TabsContent>
        <TabsContent value="library">
          <ListCard title="home" description="home post" />
          <ListCard title="home" description="home post"/>
        </TabsContent>
        <TabsContent value="blog">
          <ListCard title="home" description="home post" />
          <ListCard title="home" description="home post"/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default List;
