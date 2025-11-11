"use client";

import useGetFrameDetails from "@/api/frames/useGetFrameDetails";

type ChatSectionProps = {
  frameId: string;
  projectId: string;
};

export default function ChatSection({ frameId, projectId }: ChatSectionProps) {
  const { data } = useGetFrameDetails({ frameId, projectId });
    console.log("Frame details data:", data);

  return <div className="w-96 shadow h-[91vh]">ChatSection</div>;
}
