import ImageLoad from "@/components/guest/ImageLoad";
import AuthForm from "@/components/shared/AuthForm";

export default function Login() {
  return (
    <div className="grid grid-cols-2 items-center h-[60vh]">
      <div>
        <div className="mb-5">
          <h3 className="text-lime-950 font-bold text-5xl">Welcome back!</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Enter your credentials to continue shopping
          </p>
        </div>
        <AuthForm />
      </div>

      <div>
        <ImageLoad
          className="h-96 w-full"
          src="/images/login-img.png"
          alt="login-img"
        />
      </div>
    </div>
  );
}
