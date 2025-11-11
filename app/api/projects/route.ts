import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

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

  const projectId = uuidv4();
  const frameId = uuidv4();

  const [projectResult] = await db
    .insert(projectTable)
    .values({
      createdBy: userEmail,
      projectId,
    })
    .returning();

  const [frameResult] = await db
    .insert(frameTable)
    .values({
      projectId,
      frameId,
    })
    .returning();

  const [chatResult] = await db
    .insert(chatTable)
    .values({
      chatMessages: messages,
      createdBy: userEmail,
      frameId,
    })
    .returning();

  const response = {
    projectResult,
    frameResult,
    chatResult,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
