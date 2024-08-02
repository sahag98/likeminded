import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-24">
      <h1 className="font-bold text-6xl">Like-Minded Christians</h1>
      <p>Connect with fellow Christians and further God's Kingdom together.</p>

      {/* <Link href={"/dashboard"}>
        <Button className="mt-3">Get Started</Button>
      </Link> */}
      <SignedOut>
        <SignInButton>
          <Button className="mt-3">Get Started</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link href={"/dashboard"}>
          <Button className="mt-3">Go to dashboard</Button>
        </Link>
      </SignedIn>
    </main>
  );
}
