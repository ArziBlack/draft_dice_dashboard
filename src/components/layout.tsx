import React, { ReactNode } from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.JSX.Element | ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex w-full h-8 bg-slate-700"></div>
        <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
