import { getProductBySlug } from "@/app/wix-api/product";
import { notFound } from "next/navigation";
import React from "react";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client.server";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on Flow Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductsSlugPage({
  params: { slug },
}: PageProps) {
  const product = await getProductBySlug(getWixServerClient(), slug);
  if (!product?._id) notFound(); // 404 if no such product (id)

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </main>
  );
}
