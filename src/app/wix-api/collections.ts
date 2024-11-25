import { getWixClient } from "@/lib/wix-client.base";

export async function getCollectionsBySlug(slug: string) {
  const wixClient = getWixClient();
  // get featured collections by featured name
  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  return collection || null;
}
