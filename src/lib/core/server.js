import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export async function authHeader() {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
}

async function handleStatusCode(res) {
  if (res.status === 401) {
    redirect("/unauthorized");
  }

  if (res.status === 403) {
    redirect("/forbidden");
  }

  if (!res.ok) {
    const text = await res.text();
    try {
      const parsed = JSON.parse(text);
      return parsed?.error ? { error: parsed.error } : null;
    } catch {
      return { error: `Request failed (${res.status})` };
    }
  }

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function serverFetch(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    ...options,
  });

  return handleStatusCode(res);
}

export async function protectedFetch(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: {
      ...(await authHeader()),
      ...options.headers,
    },
    ...options,
  });

  return handleStatusCode(res);
}

export async function serverMutation(path, data, method = "POST") {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
}
