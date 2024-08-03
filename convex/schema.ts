import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    user_id: v.string(),
    username: v.string(),
    denomination: v.string(),
    profession: v.string(),
    lookingfor: v.string(),
  }),
});
