"use server";

import { serverMutation } from "../core/server";

export async function submitApplication(applicationData) {
  return serverMutation("/api/applications", applicationData);
}
