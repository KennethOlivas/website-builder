"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const GetStarted = () => {
  const { user } = useUser();

  if (user) {
    return (
      <Link href="/workspace">
        <Button>
          <span>Get Started</span>
          <ArrowRight aria-hidden="true" />
        </Button>
      </Link>
    );
  }

  return (
    <SignInButton mode="modal" forceRedirectUrl="/workspace">
      <Button>
        <span>Get Started</span>
        <ArrowRight aria-hidden="true" />
      </Button>
    </SignInButton>
  );
};

export default GetStarted;
