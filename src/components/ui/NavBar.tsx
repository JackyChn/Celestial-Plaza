import { getCart } from "@/app/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NavBar() {
  const mainCart = await getCart(getWixServerClient());
  const totalQuantity =
    // refer the cart.json
    mainCart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) ||
    0;
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between p-5">
        <Link href={"/"} className="flex items-center justify-center gap-4">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Celestial Plaza</span>
        </Link>
        <p className="flex items-center justify-center">
          {totalQuantity} added in your cart!
        </p>
      </div>
    </header>
  );
}
