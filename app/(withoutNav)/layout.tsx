import Logo from "@/components/logo/logo";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-20 pt-10">
      <Logo />
      {children}
    </div>
  );
}
