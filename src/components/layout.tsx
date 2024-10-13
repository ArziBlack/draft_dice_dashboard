import React, { ReactNode } from "react"
import Sidebar from "./sidebar"

const Layout = ({children}: {children: React.JSX.Element | ReactNode}) => {
  return (
    <div className="flex">
        <Sidebar/>
        <div className="flex-1 p-6 bg-gray-100 h-screen overflow-y-auto">{children}</div>
    </div>
  )
}

export default Layout