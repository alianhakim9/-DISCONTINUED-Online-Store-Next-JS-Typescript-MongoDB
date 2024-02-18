import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex w-full h-screen ">
      <div className="bg-black w-1/2 flex flex-col items-start justify-center p-10">
        <h1 className="text-lime-400 font-bold text-5xl">
          WELCOME TO OLSHOP ADMIN
        </h1>
        <p className="text-slate-200 font-semibold">
          please enter your credentials to continue
        </p>
      </div>
      <div className="w-1/2 p-10 flex flex-col items-center justify-center gap-2">
        <h3 className="font-bold text-3xl mb-5">OLSHOP ADMIN</h3>
        <AuthForm />
        <Link
          href="/auth/register"
          className="text-sm text-blue-500 underline hover:text-lime-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
