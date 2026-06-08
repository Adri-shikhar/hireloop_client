import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Sign In | HireLoop",
  description: "Sign in to your HireLoop account.",
};

export default function SignInPage() {
  return (
    <PageShell
      title="Sign In"
      description="Welcome back. Sign in to manage applications, saved jobs, and more."
    >
      <form className="hireloop-stat-card mx-auto max-w-md space-y-5 rounded-2xl p-8">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50"
          />
        </div>
        <button
          type="button"
          className="hireloop-btn-primary w-full rounded-lg py-2.5 text-sm font-semibold text-white"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300">
            Get Started
          </Link>
        </p>
      </form>
    </PageShell>
  );
}
