"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { CreditCard, PlusIcon, Settings } from "lucide-react";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Progress } from "../ui/progress";
import { UserButton } from "@clerk/nextjs";

export default function AppSidebar() {
  const [projectList, setProjectList] = useState<string[]>([]);
  const userDetailCtx = useContext(UserDetailContext);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={35} height={35} />
          <h2 className="font-bold text-xl">Ai Website Builder</h2>
        </div>
        <Button variant="default" className="mt-4 w-full">
          <PlusIcon />
          New Project
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          {projectList.length === 0 && (
            <p className="px-2 text-sm text-muted-foreground">
              No projects yet. Click &quot;New Project&quot; to create one.
            </p>
          )}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 border rounded-xl space-y-3 bg-secondary">
          <h2 className="flex justify-center items-center">
            Remaining credits:{" "}
            <span className="font-bold">
              {userDetailCtx?.userDetail?.credits}
            </span>
          </h2>
          <Progress value={33} />
          <Button className="w-full">
            <CreditCard />
            Upgrade to Unlimited
          </Button>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <UserButton />
          <Button variant="ghost">
            <Settings />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
