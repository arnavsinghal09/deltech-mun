"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/admin/dashboard");
        }
      });
  }, [router]);

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10 h-screen">
      <div className="text-3xl font-semibold">Admin Login</div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="max-w-sm mx-10 placeholder:block p-[8px]"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="max-w-sm mx-10 block p-[8px]"
      />
      <Button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
