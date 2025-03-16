"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-2 border-b-2 border-black">
        <div className="text-3xl font-bold mb-6">Admin Dashboard</div>
        <div className="flex space-x-4">
          <Button
            variant={"default"}
            onClick={() => router.push("/admin/dashboard")}
          >
            Home
          </Button>
          <Button variant={"destructive"} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
