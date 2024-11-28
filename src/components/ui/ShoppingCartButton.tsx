"use client";

import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import React, { useState } from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "lucide-react";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: cartQuery, isLoading, error } = useCart(initialData);
  //   refer Cart.json
  const totalQuantity =
    cartQuery?.lineItems?.reduce(
      (acc, curr) => acc + (curr.quantity || 0),
      0,
    ) || 0;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
        <ShoppingCartIcon />
        <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {totalQuantity < 10 ? totalQuantity : "9+"}
        </span>
      </Button>
    </div>
  );
}
