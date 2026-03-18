import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-black text-white"
      style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 md:px-14 py-6 border-b border-white/6">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://framerusercontent.com/images/qlrjMZi3igRllRBKsGBe7WQE.png"
            alt="SalesMonk"
            style={{ height: '22px', width: 'auto' }}
          />
        </Link>
        <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-3">
          {user?.firstName ? `Hey, ${user.firstName}` : "Your applications"}
        </p>
        <h1 className="text-2xl text-white mb-10" style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>
          Application status
        </h1>

        {/* Placeholder — will show real data once Convex is connected */}
        <div className="border border-white/8 rounded-xl p-8 text-center">
          <p className="text-white/25 text-sm mb-4">No applications yet.</p>
          <Link
            href="/"
            className="text-xs text-white/40 border border-white/10 px-4 py-2 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            View open roles →
          </Link>
        </div>
      </div>
    </div>
  );
}
