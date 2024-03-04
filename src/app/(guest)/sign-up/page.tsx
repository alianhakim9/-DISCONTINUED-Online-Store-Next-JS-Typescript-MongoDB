import ImageLoad from "@/components/guest/ImageLoad";
import AuthForm from "@/components/shared/AuthForm";

export default function SignUp() {
  return (
    <div className="grid grid-cols-2 justify-between items-center ">
      <div>
        <div className="mb-5">
          <h3 className="text-lime-950 font-bold text-5xl">
            Create your account for free!
          </h3>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Enter your credentials to continue shopping
          </p>
        </div>
        <AuthForm isSignUp />
      </div>

      <div>
        <ImageLoad
          className="h-96 w-full"
          src="/images/sign-up-img.png"
          alt="sign-up-img"
        />
      </div>
    </div>
  );
}
