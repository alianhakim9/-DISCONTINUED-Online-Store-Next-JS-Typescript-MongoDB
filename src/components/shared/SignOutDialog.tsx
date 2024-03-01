"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { onSignOut } from "@/utils/helper";

interface ISignOutDialog {
  callbackUrl?: string;
  linkBtn?: boolean;
}

const SignOutDialog = ({ callbackUrl, linkBtn }: ISignOutDialog) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant={linkBtn ? "link" : "default"}>
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. You must login again to access this
            page
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => onSignOut(callbackUrl)}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutDialog;
