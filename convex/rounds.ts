import { query } from "./_generated/server";
import { v } from "convex/values";

export const listByRole = query({
  args: { roleId: v.id("roles") },
  handler: async (ctx, { roleId }) => {
    const rounds = await ctx.db
      .query("rounds")
      .withIndex("by_role", (q) => q.eq("roleId", roleId))
      .collect();
    return rounds.sort((a, b) => a.order - b.order);
  },
});
