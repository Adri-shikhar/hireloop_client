"use server";

import { serverMutation } from "../core/server";

export async function createCompany(newCompanyData) {
  return serverMutation("/api/companies", newCompanyData);
}
