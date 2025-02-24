import Link from "next/link";
import { Button } from "../ui/button";
import { FileText, UserPlus, Home } from "lucide-react";
import React from "react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-6">
        <div className="text-2xl font-bold mb-6">MUN Dashboard</div>
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/new-blog">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              New Blog
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" className="w-full justify-start">
              <UserPlus className="mr-2 h-4 w-4" />
              Register for MUN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
