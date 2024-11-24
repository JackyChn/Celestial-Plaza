import { getWixClient } from "@/lib/wix-client.base";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NavBar() {
  const mainCart = await getCart();
  const totalQuantity =
    // refer the cart.json
    mainCart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) ||
    0;
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between p-5">
        <Link href={"/"} className="flex items-center justify-center gap-4">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
        <p className="flex items-center justify-center">
          {totalQuantity} added in your cart!
        </p>
      </div>
    </header>
  );
}

async function getCart() {
  const wixClient = getWixClient();

  try {
    // no prarms, directly get the whole cart
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    // no cart found
    if ((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND")
      return null;
    else {
      throw error;
    }
  }
}
