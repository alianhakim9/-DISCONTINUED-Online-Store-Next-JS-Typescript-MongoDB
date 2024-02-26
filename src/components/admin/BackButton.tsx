"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IBackButton {
  destination: string;
}

const BackButton = ({ destination }: IBackButton) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(destination)} variant="secondary">
      Back
    </Button>
  );
};

export default BackButton;
