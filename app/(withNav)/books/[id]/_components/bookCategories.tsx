import React from "react";
import BookInfoSection from "./bookInfoSection";

interface Props {
  categories: string[];
}

export default function BookCategories({ categories }: Props) {
  return (
    <BookInfoSection title="Categories">
      <div>
        <ul>
          {categories?.map((category) => (
            <li className="list-disc list-inside">{category}</li>
          ))}
        </ul>
      </div>
    </BookInfoSection>
  );
}
