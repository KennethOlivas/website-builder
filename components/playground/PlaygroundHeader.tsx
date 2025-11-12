import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { SaveIcon } from "lucide-react";
import ToggleTheme from "../ToggleTheme";

export default function PlaygroundHeader() {
  return (
    <div className="flex justify-between items-center p-4 shadow border-b bg-accent">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <div className="flex gap-2 ">
        <ToggleTheme />
        <Button icon={<SaveIcon />}>Save</Button>
      </div>
    </div>
  );
}
