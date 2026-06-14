import PostJobForm from "./PostJobForm";
import { getUserSession } from "@/lib/core/session";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

export default async function PostJobPage() {
  const recruiter = await getUserSession();
  const company = await getLoggedInRecruiterCompany();

  return <PostJobForm recruiter={recruiter} company={company} />;
}
