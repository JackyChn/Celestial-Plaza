"use client";

import Badge from "@/components/ui/badge";
import WixImage from "@/components/WixImage";
import React, { useState } from "react";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      /* e.g.
      product.productOptions =
        [
            { name: "color", choices: [{ description: "red" }, { description: "blue" }] },
            { name: "size", choices: [{ description: "large" }, { description: "small" }] }
        ],
        then after map, it becomes:
        [
            { color: "red" },
            { size: "large" }
        ],
        then after ruduce, it becomes:
        { color: "red", size: "large" }
        which gives the first color and first size choice (typically, encapsulate every first choice of every option to an object)
    */
      //  refer more in Porduct.json, productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );
  const selectedVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions); // true/false

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      {/* product image */}
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={product.media?.mainMedia?.image?.url}
          alt={product.media?.mainMedia?.image?.altText}
          width={1000}
          height={1000}
          className="sticky top-0"
        />
      </div>

      {/* product info */}
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product?.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}
        </div>
        {product.description && (
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="text-black dark:text-slate-100"
          />
        )}
        <ProductPrice product={product} selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div>
          Selected options:
          {JSON.stringify(selectedOptions)}
        </div>
        <div>Varients: {JSON.stringify(selectedVariant)}</div>
      </div>
    </div>
  );
}
