import { getWixClient } from "@/lib/wix-client.base";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";

export default async function NavBar() {
  const mainCart = await getCart();
  const totalQuantity =
    // refer the cart.json
    mainCart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) ||
    0;
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto max-w-7xl p-5">
        <Link href={"/"} className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
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
