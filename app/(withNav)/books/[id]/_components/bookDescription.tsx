import React from "react";
import parse from "html-react-parser";
import BookInfoSection from "./bookInfoSection";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  description: string;
}

export default function BookDescription({ description }: Props) {
  return (
    <BookInfoSection title="Description" expandable>
      <div className="flex-1 overflow-hidden flex flex-col gap-3">
        {parse(description)}
      </div>
    </BookInfoSection>
  );
}

BookDescription.Skeleton = function BookDescriptionSkeleton() {
  return <Skeleton className="w-full h-[300px]" />;
};
