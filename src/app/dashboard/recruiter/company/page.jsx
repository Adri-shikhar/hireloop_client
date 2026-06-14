import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

export default async function MyCompanyPage() {
  const recruiter = await getUserSession();
  const company = recruiter?.id ? await getRecruiterCompany(recruiter.id) : null;

  return <CompanyProfile recruiter={recruiter} recruiterCompany={company} />;
}
