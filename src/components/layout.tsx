import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import { ModeToggle } from "./mode-toggle";
import { Bell, Search, User } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Layout = ({ children }: { children: React.JSX.Element | ReactNode }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-background px-6 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-2 w-full max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="h-9 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <button className="relative rounded-full hover:bg-accent hover:text-accent-foreground p-2">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
            </button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-x-auto w-full bg-gray-50 dark:bg-gray-900 px-6 pl-[100px] flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
