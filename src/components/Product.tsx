import { formatCurrency } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link href={`/products/${product.slug}`} className="h-full border bg-card">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="space-y-3 p-3">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <div
            className="line-clamp-5"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
          {/* <div className="line-clamp-5">{product.description}</div> */}
        </div>
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
