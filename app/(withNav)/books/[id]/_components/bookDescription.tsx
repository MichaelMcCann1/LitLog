import React from "react";
import parse from "html-react-parser";
import BookInfoSection from "./bookInfoSection";

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
