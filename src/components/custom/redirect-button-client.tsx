"use client"

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const RedirectButtonClient = ({
  children,
  className,
  path,
}: {
  children?: any;
  className?: string;
  path: string;
}) => {
  const router = useRouter();
  return (
    <Button className={className} onClick={() => router.push(path)}>
      {" "}
      {children}
    </Button>
  );
};

export default RedirectButtonClient;
