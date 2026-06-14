"use server";

import { serverMutation } from "../core/server";

export async function createJob(newJobData) {
  return serverMutation("/api/jobs", newJobData);
}
