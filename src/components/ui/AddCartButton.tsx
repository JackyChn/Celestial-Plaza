import { products } from "@wix/stores";
import { Button, ButtonProps } from "./button";
import { addToCart } from "@/app/wix-api/cart";
import { WixClient } from "@wix/sdk";
import { wixBrowserClient } from "@/lib/wix-client-browser";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() =>
        addToCart(wixBrowserClient, {
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
    >
      Add to Cart
    </Button>
  );
}
