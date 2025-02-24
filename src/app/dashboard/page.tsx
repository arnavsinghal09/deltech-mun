import Link from "next/link";
import { DeltechBlack } from "../../../public /logos/deltech-black";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const user = await currentUser();

  if(!user){redirect("/auth/signin")}

  console.log("Hehehe", user);

  return (
    <div className="overflow-auto justify-center items-center  w-full break-words">
      {JSON.stringify(user)}
    </div>
  );
}
