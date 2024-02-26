"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OAuthButton from "./OAuthButton";
import axios, { AxiosError } from "axios";
import { showToast } from "@/utils/helper";
import { useState } from "react";
interface IAuthFormProps {
  isSignUp?: boolean;
  signUpUrl?: string;
  fromAdmin?: boolean;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z.object({
  name: z.string().min(2).max(100),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const AuthForm = ({ isSignUp, signUpUrl, fromAdmin }: IAuthFormProps) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    if (isSignUp && fromAdmin) {
      await axios
        .post("/api/auth/register", values)
        .then(() => {
          showToast("Register success, please login", "success");
        })
        .catch((error: AxiosError) => {
          showToast(error.message, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!isSignUp && fromAdmin) {
      const email = values.email;
      const password = values.password;
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: `/dashboard`,
        redirect: false,
      });
      if (res?.status === 401) showToast("Login failed", "error");
      if (res?.status === 200) router.push("/dashboard");
      setIsLoading(false);
    }
  }

  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/2"
      >
        {isSignUp && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {isSignUp && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignUp && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-col">
          <Button
            type="submit"
            className={`${
              fromAdmin && "w-full self-stretch"
            } mt-5 self-start min-w-[150px] rounded-lg shadow-lg`}
            disabled={isLoading}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          {!isSignUp && fromAdmin && (
            <Button
              type="button"
              className="mt-5 self-stretc rounded-lg shadow-lg"
              variant="outline"
              onClick={() => {
                if (signUpUrl) router.push(signUpUrl);
              }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          )}
        </div>
        {fromAdmin && (
          <div className="mt-4 flex flex-col gap-2">
            <hr />
            <p className="text-center">Or</p>
            <OAuthButton
              onClick={() => signIn("google")}
              title={isSignUp ? "Sign Up" : "Login"}
            />
          </div>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
