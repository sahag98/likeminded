"use client";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { Input } from "./ui/input";
import SearchForm from "./search-form";

const LookingFor = (props: {
  preloadedProfiles: Preloaded<typeof api.profile.getAllProfiles>;
}) => {
  const profiles = usePreloadedQuery(props.preloadedProfiles);
  return (
    <div className="w-full">
      <SearchForm />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        {profiles.map((profile) => (
          <div key={profile._id}>
            <h2>{profile.username}</h2>
            <span>{profile.denomination}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LookingFor;
