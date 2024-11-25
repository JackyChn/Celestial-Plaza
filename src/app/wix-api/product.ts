import { getWixClient, WixClient } from "@/lib/wix-client.base";
import { cache } from "react";

interface QueryProductsFilter {
  collectionIds?: string[] | string;
  sort: ProductSort;
}

// R: all products logic
export async function queryProudcts({
  collectionIds,
  sort = "last_updated",
}: QueryProductsFilter) {
  const wixClient = getWixClient();

  let query = wixClient.products.queryProducts();
  // .hasSome("collectionIds", [collection._id])
  // .descending("lastUpdated")
  // .find();

  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds) // if is an array
      ? collectionIds // yes, leave it as an array
      : [collectionIds] // no, a string, then put as an array
    : []; // no collectionsIds at all, then put as an empty array

  if (collectionIdsArray.length > 0)
    query = query.hasSome("collectionIds", collectionIdsArray); // .hasSome("collectionIds", [collection._id])

  // sort logic
  switch (sort) {
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
  }

  return query.find();
}

// R: product by slug
export const getProductBySlug = cache(async (slug: string) => {
  const wixClient = getWixClient();
  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();

  const product = items[0];

  if (!product || !product.visible) {
    return null;
  }

  return product;
});
