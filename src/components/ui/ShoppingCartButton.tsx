"use client";

import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import React, { useState } from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import WixImage from "../WixImage";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: cartQueryData, isLoading, error } = useCart(initialData);
  // console.log(cartQueryData);
  //   refer Cart.json
  const totalQuantity =
    cartQueryData?.lineItems?.reduce(
      (acc, curr) => acc + (curr.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
          <ShoppingCartIcon />
          <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="flex flex-col sm:max-w-lg">
          {/* header */}
          <SheetHeader>
            <SheetTitle>
              Your cart{" "}
              <span className="text-base">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col space-y-2 overflow-auto">
            <ul className="space-y-5">
              {cartQueryData?.lineItems.map((item) => (
                <ShoppingCartItem key={item._id} item={item} />
              ))}
            </ul>
            {/* <pre>{JSON.stringify(cartQueryData, null, 2)}</pre> */}
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal amount</p>
              <p className="font-bold">
                {cartQueryData?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
}

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <Link href={`/products/${slug}`}>
        <WixImage
          mediaIdentifier={item.image}
          width={110}
          height={110}
          alt={item?.productName?.translated || "Porduct Image"}
          className="flex-none bg-secondary"
        />
      </Link>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`}>
          <p className="font-bold">{item.productName?.translated || "Item"}</p>
        </Link>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
        {/* price */}
        <div className="flex items-center gap-2">
          {item.quantity} X {item.price?.formattedConvertedAmount}
          {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
            <span className="text-muted-foreground line-through">
              {item.fullPrice.formattedAmount}
            </span>
          )}
        </div>
        {/* -/+ buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant={"outline"}
            size={"sm"}
            disabled={item.quantity === 1}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant={"outline"}
            size={"sm"}
            disabled={quantityLimitReached}
          >
            +
          </Button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
