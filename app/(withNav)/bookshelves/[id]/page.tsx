import { auth } from "@/auth";
import { getBookShelfName } from "@/lib/actions";
import React from "react";

export default async function book({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  const shelfData = await getBookShelfName(session?.user?.name, params.id);

  return (
    <div>
      <p>{shelfData?.shelf_name}</p>
    </div>
  );
}
