import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "../auth";

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
}

export async function getUserToken() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
}

export async function requireRole(role) {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user?.role !== role) {
    redirect("/unauthorized");
  }

  return user;
}
