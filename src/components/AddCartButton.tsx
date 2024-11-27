import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { addToCart } from "@/app/wix-api/cart";
import { WixClient } from "@wix/sdk";
import { wixBrowserClient } from "@/lib/wix-client-browser";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton(
  wixClient: WixClient,
  {
    product,
    selectedOptions,
    quantity,
    className,
    ...props
  }: AddToCartButtonProps,
) {
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
    ></Button>
  );
}
