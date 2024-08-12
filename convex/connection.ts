import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createConnection = mutation({
  args: {
    user_id: v.string(),
    invited_user_id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("You're not supposed to be here.");
    }

    const existingConnection = await ctx.db
      .query("connections")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("user_id"), args.user_id),
            q.eq(q.field("invited_user_id"), args.invited_user_id)
          ),
          q.and(
            q.eq(q.field("user_id"), args.invited_user_id),
            q.eq(q.field("invited_user_id"), args.user_id)
          )
        )
      )
      .first();

    console.log("exists: ", existingConnection);

    if (!existingConnection) {
      await ctx.db.insert("connections", {
        user_id: args.user_id,
        invited_user_id: args.invited_user_id,
      });
    }
  },
});

export const getAllConnections = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("connections").collect();

    return entries;
  },
});
