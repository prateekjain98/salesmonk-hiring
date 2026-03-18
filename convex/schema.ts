import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  roles: defineTable({
    slug: v.string(),
    title: v.string(),
    team: v.string(),
    type: v.string(),
    status: v.union(v.literal("open"), v.literal("closed")),
    description: v.string(),
    responsibilities: v.array(v.string()),
    requirements: v.array(v.string()),
    perks: v.array(v.string()),
  }).index("by_slug", ["slug"]),

  rounds: defineTable({
    roleId: v.id("roles"),
    name: v.string(),
    description: v.string(),
    order: v.number(),
  }).index("by_role", ["roleId"]),

  applications: defineTable({
    roleId: v.id("roles"),
    clerkUserId: v.string(),
    status: v.union(
      v.literal("applied"),
      v.literal("in_review"),
      v.literal("in_progress"),
      v.literal("offered"),
      v.literal("rejected"),
      v.literal("withdrawn")
    ),
    currentRoundId: v.optional(v.id("rounds")),
    githubUrl: v.string(),
    linkedinUrl: v.string(),
    appliedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user", ["clerkUserId"])
    .index("by_role", ["roleId"])
    .index("by_role_and_user", ["roleId", "clerkUserId"]),
});
