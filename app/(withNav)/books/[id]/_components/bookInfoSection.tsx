"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
  expandable?: boolean;
}

export default function BookInfoSection({
  title,
  children,
  expandable,
}: Props) {
  let [open, setOpen] = useState(false);

  return (
    <div
      className={cn("flex flex-col gap-3 border rounded p-6 items-start", {
        "max-h-[300px]": expandable && !open,
      })}
    >
      <p className="font-bold uppercase">{title}</p>
      {children}
      {expandable && (
        <Button variant="outline" onClick={() => setOpen((state) => !state)}>
          {open ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}
