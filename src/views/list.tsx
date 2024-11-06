import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const List = (): React.JSX.Element => {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <Tabs
        defaultValue="home"
        className="w-full flex flex-col items-center justify-center pb-12"
      >
        <TabsList className="mb-10">
          <TabsTrigger value="home">Home Posts</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="blog">Blog post</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"></div>
        </TabsContent>
        <TabsContent value="library">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"></div>
        </TabsContent>
        <TabsContent value="blog">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"></div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default List;
