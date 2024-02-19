"use client";

import { showToast } from "@/utils/helper";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";

interface Props {
  isRegister?: boolean;
}

const AuthForm = ({ isRegister }: Props) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAuth = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegister) {
      await axios
        .post("/api/auth/register", {
          name,
          username,
          email,
          password,
        })
        .then(() => {
          showToast("Register success, please login", "success");
          emptyInputState();
        })
        .catch((error: AxiosError) => {
          showToast(error.message, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // await axios
      //   .post("/api/auth/login", {
      //     email,
      //     password,
      //   })
      //   .then(() => {
      //     showToast("Login success", "success");
      //     router.push("/dashboard/products");
      //   })
      //   .catch(() => {
      //     showToast("Login failed", "error");
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: `/dashboard/products`,
        redirect: false,
      });
      if (res?.status === 401) showToast("Login failed", "error");
      // if (res?.url) router.push(res.url);
      setIsLoading(false);
    }
  };

  if (session) {
    router.push("/dashboard");
  }

  const emptyInputState = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className="flex flex-col w-1/2 gap-1" onSubmit={handleAuth}>
      {isRegister && (
        <>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="btn-black disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:text-white"
        disabled={isLoading}
      >
        {isRegister ? "Sign Up" : "Login"}
      </button>
      <p className="text-center text-sm font-bold">Or</p>
      <button
        className="bg-slate-100 p-2 shadow-sm flex items-center justify-center gap-4 hover:bg-blue-500 hover:text-white"
        onClick={() => signIn("google")}
        type="button"
      >
        <BsGoogle /> {isRegister ? "Sign Up" : "Sign In"} With Google
      </button>
    </form>
  );
};

export default AuthForm;
