import React, { Suspense } from "react";
import TotalBooks from "./TotalBooks";
import TotalPages from "./TotalPages";
import KpiBox from "./KpiBox";

interface Props {
  username: string | null | undefined;
}

export default function KpiSection({ username }: Props) {
  return (
    <div className="flex gap-6 justify-center">
      <Suspense fallback={<KpiBox.Skeleton />}>
        <TotalBooks username={username} />
      </Suspense>
      <Suspense fallback={<KpiBox.Skeleton />}>
        <TotalPages username={username} />
      </Suspense>
    </div>
  );
}
