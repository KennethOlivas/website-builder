import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST requests to create or fetch an application user based on the authenticated Clerk user.
 *
 * Workflow:
 * 1. Retrieves the current authenticated Clerk user via `currentUser()`.
 * 2. Extracts the primary email address; if absent, responds with HTTP 401 Unauthorized.
 * 3. Queries the `usersTable` for an existing user matching the email.
 * 4. If no record exists, inserts a new user with email and full name (empty string fallback) and returns the created row.
 * 5. If a user already exists, returns the Clerk user object (not the database row).
 *
 * Response Shapes:
 * - 401: Plain text "Unauthorized" if no email is available.
 * - 200: Newly inserted user row (when created).
 * - 200: `{ user }` object containing the Clerk user data (when already exists).
 *
 * Side Effects:
 * - May insert a new row into `usersTable`.
 *
 * @param req Incoming Next.js `NextRequest` (unused in current implementation).
 * @returns A `Response` whose JSON body varies based on authentication and persistence state.
 * @throws Propagates any unexpected database or Clerk API errors.
 */
export async function POST() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // no user on the database
  if (userResult.length === 0) {
    const data = {
      email: email,
      name: user?.fullName ?? "",
      credits: 2,
    };
    // insert user
    await db.insert(usersTable).values(data).returning();

    return NextResponse.json({ user: data });
  }

  return Response.json({ user: userResult[0] });
}
