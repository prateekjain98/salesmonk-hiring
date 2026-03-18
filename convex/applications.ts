import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const apply = mutation({
  args: {
    roleId: v.id("roles"),
    clerkUserId: v.string(),
    githubUrl: v.string(),
    linkedinUrl: v.string(),
  },
  handler: async (ctx, { roleId, clerkUserId, githubUrl, linkedinUrl }) => {
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_role_and_user", (q) =>
        q.eq("roleId", roleId).eq("clerkUserId", clerkUserId)
      )
      .first();

    if (existing) return existing._id;

    const now = Date.now();
    return await ctx.db.insert("applications", {
      roleId,
      clerkUserId,
      githubUrl,
      linkedinUrl,
      status: "applied",
      appliedAt: now,
      updatedAt: now,
    });
  },
});

export const getByRoleAndUser = query({
  args: { roleId: v.id("roles"), clerkUserId: v.string() },
  handler: async (ctx, { roleId, clerkUserId }) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_role_and_user", (q) =>
        q.eq("roleId", roleId).eq("clerkUserId", clerkUserId)
      )
      .first();
  },
});

export const listByUser = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_clerk_user", (q) => q.eq("clerkUserId", clerkUserId))
      .collect();
  },
});
