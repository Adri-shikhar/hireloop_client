import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import JobApply from "./JobApply";

export default async function ApplyPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/sign-in?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="page">
        <div className="card" style={{ maxWidth: 480, margin: "80px auto", textAlign: "center" }}>
          <ShieldAlert size={40} style={{ margin: "0 auto 16px", color: "#fbbf24" }} />
          <h1>Seekers only</h1>
          <p className="subtitle" style={{ marginBottom: 24 }}>
            Recruiters and other account types cannot apply for jobs. Sign in with a job seeker account to apply.
          </p>
          <Link href={`/jobs/${id}`} className="btn-secondary">
            Back to job
          </Link>
        </div>
      </div>
    );
  }

  const job = await getJobById(id);

  if (!job) {
    redirect("/jobs");
  }

  return (
    <div className="page" style={{ maxWidth: 720, margin: "0 auto" }}>
      <JobApply job={job} applicant={user} />
    </div>
  );
}
