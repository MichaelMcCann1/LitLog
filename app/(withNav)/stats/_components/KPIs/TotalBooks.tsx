import { getUsersCompletedBooksCount } from "@/lib/actions/statsActions";
import React from "react";
import KpiBox from "./KpiBox";

interface Props {
  username: string | null | undefined;
}

export default async function TotalBooks({ username }: Props) {
  const bookCount = await getUsersCompletedBooksCount(username);

  return <KpiBox title="Total Books Read" value={Number(bookCount)} />;
}
