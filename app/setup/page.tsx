import { ProfileSetupForm } from "@/components/profile-setup-form";
import { currentUser } from "@clerk/nextjs/server";
import { Hand } from "lucide-react";
import React from "react";

const SetupPage = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full border shadow-md rounded-xl p-5 lg:w-1/3 flex flex-col items-center justify-center">
        <section className="flex items-center gap-2">
          <h1 className="font-bold text-2xl">Hey,{user?.firstName}</h1>
          <Hand />
        </section>
        <p>Let&apos;s setup your profile.</p>
        <ProfileSetupForm />
      </div>
    </div>
  );
};

export default SetupPage;
