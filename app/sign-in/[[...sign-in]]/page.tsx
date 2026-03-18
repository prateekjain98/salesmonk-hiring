import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
      style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
      <Link href="/" className="mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://framerusercontent.com/images/qlrjMZi3igRllRBKsGBe7WQE.png"
          alt="SalesMonk"
          style={{ height: '22px', width: 'auto' }}
        />
      </Link>
      <SignIn />
    </div>
  );
}
