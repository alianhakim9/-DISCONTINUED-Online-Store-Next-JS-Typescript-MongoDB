"use client";

import { Button } from "@/components/ui/button";
import { IoLogoGoogle } from "react-icons/io5";

interface IOAuthButton {
  onClick: () => void;
  title: string;
  isLoading?: boolean;
}

const OAuthButton = ({ onClick, title, isLoading }: IOAuthButton) => {
  return (
    <Button
      type="button"
      className="self-stretch rounded-lg shadow-lg"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
    >
      <IoLogoGoogle size={20} className="mr-4" /> {title} With Google
    </Button>
  );
};

export default OAuthButton;
