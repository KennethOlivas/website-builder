import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { SaveIcon } from "lucide-react";

export default function PlaygroundHeader() {
  return (
    <div className="flex justify-between items-center p-4 shadow border-b">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <Button icon={<SaveIcon />}>Save</Button>
    </div>
  );
}
