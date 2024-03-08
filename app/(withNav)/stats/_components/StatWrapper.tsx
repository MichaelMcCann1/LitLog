import React, { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function StatWrapper({ title, children }: Props) {
  return (
    <div className="flex flex-col border items-center py-6 px-3 gap-8 flex-1 rounded-lg">
      <p className="font-medium sm:text-xl text-center">{title}</p>
      {children}
    </div>
  );
}
