import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createProfile = mutation({
  args: {
    username: v.string(),
    denomination: v.string(),
    profession: v.string(),
    lookingfor: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("You're not supposed to be here.");
    }
    await ctx.db.insert("profiles", {
      user_id: user.subject,
      username: args.username,
      denomination: args.denomination,
      profession: args.profession,
      lookingfor: args.lookingfor,
    });
  },
});

export const getAllProfiles = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    const entries = await ctx.db
      .query("profiles")
      .filter((q) => q.neq(q.field("user_id"), user?.subject))
      .collect();

    return entries;
  },
});
