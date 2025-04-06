
// components/RequireAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // Not logged in → go to login
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
