"use client";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import React, { useState } from "react";
import { Button } from "./button";
import { Loader2, ShoppingCartIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import WixImage from "../WixImage";
import { cn } from "@/lib/utils";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: cartQueryData, isFetching, error } = useCart(initialData);
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
      {/* side sheet for cart info */}
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
          <div className="flex grow flex-col space-y-2 overflow-auto pt-1">
            <ul className="space-y-5">
              {cartQueryData?.lineItems.map((item) => (
                <ShoppingCartItem key={item._id} item={item} />
              ))}
            </ul>
            {/* isLoading cart */}
            {isFetching && <Loader2 className="mx-auto animate-spin" />}
            {/* loading cart error */}
            {error && <p className="text-destructive">{error.message}</p>}
            {/* is not loading and no item, cart is empty, show go shopping link */}
            {!isFetching && !cartQueryData?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="">Your cart is empty</p>
                  <Link
                    href={"/shop"}
                    className="text-primary hover:underline"
                    onClick={() => setSheetOpen(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
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
          <Button size={"lg"} disabled={!totalQuantity || isFetching}>
            Checkout
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
}

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutatation = useRemoveCartItem();
  const productId = item._id;

  if (!productId) return null;
  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`}>
          <WixImage
            mediaIdentifier={item.image}
            width={110}
            height={110}
            alt={item?.productName?.translated || "Porduct Image"}
            className="flex-none bg-secondary"
          />
        </Link>
        <button
          className="absolute -right-1 -top-1 rounded-full border bg-background p-0.5"
          onClick={() => removeItemMutatation.mutate(productId)}
        >
          <X className="size-3" />
        </button>
      </div>
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
            disabled={item?.quantity === 1}
            className={cn(
              item?.quantity === 1 ? "border-slate-300" : "border-slate-950",
            )}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId: item._id!,
                // quantity undefined then put it as 0
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant={"outline"}
            size={"sm"}
            disabled={quantityLimitReached}
            className={cn(
              quantityLimitReached ? "border-slate-300" : "border-slate-950",
            )}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId: item._id!,
                // quantity undefined then put it as 1
                newQuantity: !item.quantity ? 1 : item.quantity + 1,
              })
            }
          >
            +
          </Button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
