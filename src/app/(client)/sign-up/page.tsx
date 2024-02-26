import AuthForm from "@/components/shared/AuthForm";

export default function SignUp() {
  return (
    <div className="flex justify-between items-center ">
      <div className="w-1/2">
        <div className="mb-5">
          <h3 className="text-yellow-300 font-bold text-5xl">
            Create your account for free!
          </h3>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Enter your credentials to continue shopping
          </p>
        </div>
        <AuthForm isSignUp />
      </div>
    </div>
  );
}
