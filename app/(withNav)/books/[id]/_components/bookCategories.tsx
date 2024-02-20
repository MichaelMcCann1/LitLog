import React from "react";
import BookInfoSection from "./bookInfoSection";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  categories: string[];
}

export default function BookCategories({ categories }: Props) {
  return (
    <BookInfoSection title="Categories">
      <div>
        <ul>
          {categories?.map((category) => (
            <li key={category} className="list-disc list-inside">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </BookInfoSection>
  );
}

BookCategories.Skeleton = function BookCategoriesSkeleton() {
  return <Skeleton className="w-full h-[200px]" />;
};
