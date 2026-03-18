"use client";

import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const role = useQuery(api.roles.getBySlug, { slug });
  const rounds = useQuery(
    api.rounds.listByRole,
    role ? { roleId: role._id } : "skip"
  );
  const existingApplication = useQuery(
    api.applications.getByRoleAndUser,
    user && role ? { roleId: role._id, clerkUserId: user.id } : "skip"
  );
  const apply = useMutation(api.applications.apply);

  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (isLoaded && !user) {
    router.replace(`/sign-in?redirect_url=/apply/${slug}`);
    return null;
  }

  if (!isLoaded || role === undefined || rounds === undefined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />
      </div>
    );
  }

  if (role === null) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <p className="text-white/30 text-sm">Role not found.</p>
        <Link href="/" className="text-xs text-white/20 hover:text-white/50 mt-4 transition-colors">← Back</Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !role) return;
    setError("");

    if (!githubUrl.startsWith("https://github.com/")) {
      setError("Enter a valid GitHub profile URL (https://github.com/...)");
      return;
    }
    if (!linkedinUrl.includes("linkedin.com/in/")) {
      setError("Enter a valid LinkedIn profile URL (https://linkedin.com/in/...)");
      return;
    }

    setSubmitting(true);
    try {
      await apply({ roleId: role._id, clerkUserId: user.id, githubUrl, linkedinUrl });
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (existingApplication) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-4">Application received</p>
        <h1 className="text-2xl font-light mb-3" style={{ letterSpacing: "-0.02em" }}>You're in the queue</h1>
        <p className="text-white/35 text-sm max-w-sm mb-8">
          We'll review your application and reach out when it's time for the next step.
        </p>
        <Link href="/" className="text-xs text-white/25 hover:text-white transition-colors">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white"
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">

        <Link href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors mb-12 inline-block">← Back</Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-3 block">{role.team}</span>
          <h1 className="text-3xl text-white mb-2" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
            {role.title}
          </h1>
          <p className="text-white/25 text-sm">{role.type}</p>
        </div>

        <section className="mb-10">
          <p className="text-white/55 text-sm leading-relaxed">{role.description}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4">What you'll do</h2>
          <ul className="space-y-2.5">
            {role.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/50">
                <span className="text-white/15 shrink-0">–</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4">What we're looking for</h2>
          <ul className="space-y-2.5">
            {role.requirements.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/50">
                <span className="text-white/15 shrink-0">–</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4">Why SalesMonk</h2>
          <ul className="space-y-2.5">
            {role.perks.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/50">
                <span className="text-white/15 shrink-0">–</span>{item}
              </li>
            ))}
          </ul>
        </section>

        {/* Rounds */}
        <section className="mb-14">
          <h2 className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-6">Interview process</h2>
          <div>
            {rounds.map((round, i) => (
              <div key={round._id} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border border-white/12 flex items-center justify-center text-[9px] text-white/25 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  {i < rounds.length - 1 && <div className="w-px flex-1 bg-white/6 my-1.5" />}
                </div>
                <div className="pb-7">
                  <p className="text-sm text-white/75 mb-1">{round.name}</p>
                  <p className="text-sm text-white/30 leading-relaxed">{round.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section>
          <h2 className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-6">Start your application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/25 block mb-2">GitHub</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/25 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/25 block mb-2">LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/25 transition-colors"
              />
            </div>

            {error && <p className="text-red-400/60 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg text-sm text-white border border-white/12 hover:border-white/35 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
