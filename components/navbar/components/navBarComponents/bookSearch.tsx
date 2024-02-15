"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
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
        className=" absolute right-0 h-9 w-9 text-sky-600 hover:text-sky-600"
        size="icon"
        variant="ghost"
        type="reset"
        onClick={() => setInput("")}
      >
        <X/>
      </Button>
    </form>
  );
}
