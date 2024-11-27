import { WixClient } from "@/lib/wix-client.base";

export async function getCollectionsBySlug(wixClient: WixClient, slug: string) {
  // get featured collections by featured name
  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  return collection || null;
}
