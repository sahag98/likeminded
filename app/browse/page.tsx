import React from "react";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import LookingFor from "@/components/looking-for";
import Link from "next/link";

const PlaylistsPage = async () => {
  const preloadedProfiles = await preloadQuery(api.profile.getAllProfiles);
  return (
    <main className="min-h-screen flex-col py-24 flex justify-center items-center lg:px-40 px-4">
      <div className="md:w-3/4 w-full flex flex-col  items-center justify-center gap-2">
        <h1 className="font-bold lg:text-5xl md:text-4xl text-2xl">
          Connect with Talented Individuals
        </h1>
        <p className="md:text-lg text-base">
          Browse and connect with fellow Christian professionals across various
          industries and backgrounds.
        </p>
        <LookingFor preloadedProfiles={preloadedProfiles} />
        <Link href={"/dashboard"} className="underline text-sm cursor-pointer">
          Skip for now
        </Link>
      </div>
    </main>
  );
};

export default PlaylistsPage;
