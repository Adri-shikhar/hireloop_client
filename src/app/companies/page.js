import CompanyListingContainer from "@/components/companies/CompanyListingContainer";
import { getCompanies } from "@/lib/api/companies";

export const metadata = {
  title: "Companies | HireLoop",
  description: "Discover world-class companies hiring on HireLoop.",
};

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return <CompanyListingContainer initialCompanies={companies} />;
}
