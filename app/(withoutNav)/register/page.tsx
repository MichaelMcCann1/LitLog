import React from "react";
import RegistrationForm from "./_components/registrationForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <RegistrationForm />;
}
