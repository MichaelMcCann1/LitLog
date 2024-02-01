"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function BookSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const search = formData.get("title")?.toString();

    if (!search) return;

    params.set("query", search);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <form action={handleSubmit} className="flex">
        <Input
          className="w-[400px]"
          name="title"
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search Books"
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
