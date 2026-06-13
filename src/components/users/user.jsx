"use client";

import { useSession } from "@/lib/auth-client";

export function UserInformation() {
  const { data: session, isPending, error } = useSession();

  return {
    user: session?.user || null,
    isLoading: isPending,
    error,
    isAuthenticated: !!session?.user,
  };
}
