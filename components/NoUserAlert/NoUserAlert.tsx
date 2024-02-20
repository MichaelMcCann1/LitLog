import React from "react";

interface Props {
  message: string;
}

export default function NoUserAlert({ message }: Props) {
  return (
    <div className="bg-sky-100 py-4 px-4 rounded">
      <p className="max-w-[600px]">{message}</p>
    </div>
  );
}
