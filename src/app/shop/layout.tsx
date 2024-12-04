import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "../wix-api/collections";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections(getWixServerClient());

  return <div>{children}</div>;
}
