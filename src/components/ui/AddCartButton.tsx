import { products } from "@wix/stores";
import { Button, ButtonProps } from "./button";
import { addToCart } from "@/app/wix-api/cart";
import { WixClient } from "@wix/sdk";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";

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
  const { addItem, isAdding } = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() =>
        addItem({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={isAdding}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon />
      Add to Cart
    </LoadingButton>
  );
}
