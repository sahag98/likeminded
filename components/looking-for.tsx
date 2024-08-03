"use client";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";

const LookingFor = (props: {
  preloadedProfiles: Preloaded<typeof api.profile.getAllProfiles>;
}) => {
  const profiles = usePreloadedQuery(props.preloadedProfiles);

  console.log(profiles);
  return (
    <div>
      <h1>Find the help you&apos;re looking for</h1>
      {profiles.length === 0 ? (
        <div>
          <h2>No profiles yet. Come back and try again.</h2>
        </div>
      ) : (
        profiles.map((profile) => (
          <div key={profile._id}>
            <h2>{profile.username}</h2>
            <span>{profile.denomination}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default LookingFor;
