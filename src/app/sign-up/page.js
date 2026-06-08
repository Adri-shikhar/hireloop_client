import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Get Started | HireLoop",
  description: "Create your HireLoop account and start your job search.",
};

export default function SignUpPage() {
  return (
    <PageShell
      title="Get Started"
      description="Create your free account and join thousands of job seekers and recruiters on HireLoop."
    >
      <form className="hireloop-stat-card mx-auto max-w-md space-y-5 rounded-2xl p-8">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/50"
          />
        </div>
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
          Create Account
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-indigo-400 hover:text-indigo-300">
            Sign In
          </Link>
        </p>
      </form>
    </PageShell>
  );
}
