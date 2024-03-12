import { getUsersTotalPageCount } from "@/lib/actions/statsActions";
import React from "react";
import KpiBox from "./KpiBox";

interface Props {
  username: string | null | undefined;
}

export default async function TotalPages({ username }: Props) {
  const pageCount = await getUsersTotalPageCount(username);

  return <KpiBox title="Total Pages Read" value={Number(pageCount)} />;
}
