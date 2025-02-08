"use client";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { RecoilRoot } from "recoil";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ClerkProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </ClerkProvider>
  );
}
