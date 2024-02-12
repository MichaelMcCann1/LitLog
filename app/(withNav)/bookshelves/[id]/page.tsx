import { auth } from '@/auth';
import { getUsersBookshelves } from '@/lib/actions';
import React from 'react'

export default async function book({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  const shelfData = await getUsersBookshelves(session?.user?.name);
  const selectedShelf = shelfData?.find(shelf => shelf.shelf_id === params.id)

  return (
    <div>{selectedShelf?.shelf_name}</div>
  )
}
