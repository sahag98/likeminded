"use client";
import { api } from "@/convex/_generated/api";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import React from "react";
import { Input } from "./ui/input";
import SearchForm from "./search-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Check, MessageCircle, MessageCirclePlus, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "./ui/use-toast";

const LookingFor = (props: {
  preloadedProfiles: Preloaded<typeof api.profile.getAllProfiles>;
}) => {
  const profiles = usePreloadedQuery(props.preloadedProfiles);

  const user = useAuth();

  const createConnection = useMutation(api.connection.createConnection);
  const allConnections = useQuery(api.connection.getAllConnections);

  function handleCreateConnection(id: string) {
    if (!user.userId) {
      return;
    }

    createConnection({ user_id: user.userId, invited_user_id: id });
    toast({
      title: "Connected Sucessfully",
      description:
        "Head over to your dashboard to start chatting with this user.",
    });
  }

  return (
    <div className="w-full">
      <SearchForm />

      <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <Card key={profile._id} className="overflow-hidden">
            <CardHeader className="bg-muted p-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <section className="bg-background rounded-full p-2">
                    <User />
                  </section>

                  <h3 className="text-lg font-semibold">{profile.username}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div>
                <p className=" text-sm text-muted-foreground">Denomination:</p>
                <p className="text-sm">{profile.denomination}</p>
              </div>
              <div>
                <p className=" text-sm text-muted-foreground">Looking for:</p>
                <p className="text-sm ">{profile.lookingfor}</p>
              </div>
              <div className="mt-4 flex flex-wrap justify-between items-end gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {profile.profession}
                </span>
                <Button
                  variant={"default"}
                  className="rounded-full"
                  size={"icon"}
                  onClick={() => handleCreateConnection(profile.user_id)}
                >
                  {allConnections?.map((conn) =>
                    conn && conn.invited_user_id === profile.user_id ? (
                      <Check />
                    ) : (
                      <MessageCirclePlus />
                    )
                  )}
                  {allConnections?.length === 0 && <MessageCirclePlus />}
                </Button>
              </div>
              {/* <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LookingFor;
