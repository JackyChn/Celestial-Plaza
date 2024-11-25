import { getProductBySlug } from "@/app/wix-api/product";
import { notFound } from "next/navigation";
import React from "react";
import ProductDetails from "./ProductDetails";

interface PageProps {
  params: { slug: string };
}

export default async function ProductsSlugPage({
  params: { slug },
}: PageProps) {
  const product = await getProductBySlug(slug);
  if (!product?._id) notFound(); // 404 if no such product (id)

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
