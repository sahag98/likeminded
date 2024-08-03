import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp forceRedirectUrl={"/setup"} fallbackRedirectUrl={"/setup"} />;
}
