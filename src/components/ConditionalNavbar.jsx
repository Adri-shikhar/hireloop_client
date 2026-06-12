"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "@/lib/auth-client";

export default function ConditionalNavbar() {
  const { data: session } = useSession();

  return <Navbar key={session?.user?.id ?? "guest"} />;
}
