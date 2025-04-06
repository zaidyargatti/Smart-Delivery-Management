// components/RequireGuest.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RequireGuestProps {
  children: React.ReactNode;
}

export default function RequireGuest({ children }: RequireGuestProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      router.replace("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}
