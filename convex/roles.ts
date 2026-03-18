import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listOpen = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("roles")
      .filter((q) => q.eq(q.field("status"), "open"))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("roles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("roles").collect();
    if (existing.length > 0) return;

    const roleId = await ctx.db.insert("roles", {
      slug: "product-engineer-intern",
      title: "Product Engineer Intern",
      team: "Engineering",
      type: "Internship · Remote",
      status: "open",
      description:
        "We're building the GTM intelligence layer — the infrastructure that helps B2B companies understand who's visiting their website, qualify them in real-time, and convert intent into pipeline. You'll be an early engineering hire working directly with the founders on the core product. No tickets, no sprints — just real problems and real ownership.",
      responsibilities: [
        "Build and ship product features end-to-end across our Next.js frontend and backend",
        "Integrate AI/ML-powered features into the product surface",
        "Own features from design to deployment with no handoffs",
        "Work on the data pipeline that processes millions of intent signals",
        "Contribute to architectural decisions that will shape the product for years",
      ],
      requirements: [
        "Strong fundamentals in JavaScript / TypeScript",
        "Hands-on experience with React and/or Node.js",
        "Bias for shipping — you iterate fast and learn faster",
        "Curiosity about AI, GTM, and how modern B2B companies grow",
        "Prior projects or internships are a plus, not a prerequisite",
      ],
      perks: [
        "Work directly with the founders on a product used by real GTM teams",
        "Fully remote, async-first culture",
        "Competitive stipend",
        "Fast track to a full-time offer for the right person",
      ],
    });

    await ctx.db.insert("rounds", {
      roleId,
      name: "Async Task",
      description:
        "A short take-home challenge (2–3 hours) based on a real problem we've faced. We want to see how you think and what you ship, not how you perform under interview pressure.",
      order: 1,
    });

    await ctx.db.insert("rounds", {
      roleId,
      name: "Technical Interview",
      description:
        "A 30-minute live session with one of our engineers. Expect a code walkthrough, architecture discussion, and a chance to ask us anything about the stack.",
      order: 2,
    });

    await ctx.db.insert("rounds", {
      roleId,
      name: "Founder Chat",
      description:
        "A 30-minute conversation with the founders about your goals, how you work, and whether this is the right fit — for both sides.",
      order: 3,
    });
  },
});
