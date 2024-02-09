"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BookSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [input, setInput] = useState(
    searchParams.get("query")?.toString() || ""
  );
  const { push } = useRouter();

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const search = formData.get("title")?.toString();

    if (!search) return;

    params.set("query", search);
    const formattedParams = params.toString();
    push(`/books?${formattedParams}`);
  };

  useEffect(() => {
    if (!pathname.includes("books")) {
      setInput("");
    }
  }, [pathname]);

  return (
    <form
      action={handleSubmit}
      className="flex items-center w-full rounded-lg relative h-9 md:max-w-[500px] "
    >
      <Input
        className="w-full rounded-lg h-full"
        placeholder="Search Books..."
        type="text"
        name="title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="p-2 rounded-lg absolute right-1"
        size="icon"
        variant="ghost"
        type="reset"
        onClick={() => setInput("")}
      >
        <Image src="/close-icon.svg" alt="clear input" height={20} width={20} />
      </Button>
    </form>
  );
}
