import AuthForm from "@/components/shared/AuthForm";

export default function Page() {
  return <AuthForm fromAdmin signUpUrl="/auth/sign-up" />;
}
