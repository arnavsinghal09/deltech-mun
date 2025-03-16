"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          router.push("/admin");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return authenticated ? (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/dashboard/blog-approval">

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-lg"
              >
                <div className="text-4xl mb-4">📝</div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Blog Approval</h2>
                  <p className="text-gray-600">
                    Review and approve member-submitted blog posts
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full h-full p-6 flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-lg"
            >
              <div className="text-4xl mb-4">🌐</div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">MUN Delegation</h2>
                <p className="text-gray-600">
                  Manage and assign delegates for upcoming MUN events
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null;
}
