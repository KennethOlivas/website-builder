import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userEmail = user.primaryEmailAddress?.emailAddress;
  if (!userEmail) {
    return new Response("User email not found", { status: 400 });
  }

  const [projectResult] = await db
    .insert(projectTable)
    .values({
      createdBy: userEmail,
    })
    .returning();

  const [frameResult] = await db
    .insert(frameTable)
    .values({
      projectId: projectResult.projectId,
    })
    .returning();

  const [chatResult] = await db
    .insert(chatTable)
    .values({
      chatMessages: messages,
      createdBy: userEmail,
    })
    .returning();

  const response = {
    projectResult,
    frameResult,
    chatResult,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
