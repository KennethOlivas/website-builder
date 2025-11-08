import AppHeader from "@/components/layouts/AppHeader";
import AppSideBar from "@/components/layouts/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function WorkSpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className="w-full">
        <AppHeader />
        <div className="p-4"> {children}</div>
      </div>
    </SidebarProvider>
  );
}

export default WorkSpaceLayout;
