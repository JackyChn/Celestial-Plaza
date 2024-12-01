import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export async function getCollectionsBySlug(wixClient: WixClient, slug: string) {
  // get featured collections by featured name
  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  return collection || null;
}

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") // all products
      .ne("_id", "32510e2b-cc3b-8d4e-ebe5-2797c8b9ad49") // featured products
      .find();

    return collections.items;
  },
);
