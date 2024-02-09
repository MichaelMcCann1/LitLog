"use client";

import React from "react";

interface Props {
  callback: () => Promise<void>;
}

export default function LogoutButton({ callback }: Props) {
  return (
    <button className="my-6" onClick={() => callback()}>
      Sign Out
    </button>
  );
}
