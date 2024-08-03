import React from "react";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import LookingFor from "@/components/looking-for";

const PlaylistsPage = async () => {
  const preloadedProfiles = await preloadQuery(api.profile.getAllProfiles);
  return (
    <div className="min-h-screen py-24 lg:px-40 px-4">
      <LookingFor preloadedProfiles={preloadedProfiles} />
    </div>
  );
};

export default PlaylistsPage;
