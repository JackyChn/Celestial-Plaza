import { getCart } from "@/app/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/app/wix-api/member";
import { getCollections } from "@/app/wix-api/collections";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "./UserButton";
import MainNavigation from "./MainNavigation";

export default async function NavBar() {
  const mainCart = await getCart(getWixServerClient());
  const wixClient = getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between p-5">
        <div className="flex flex-wrap items-center gap-5">
          <Link href={"/"} className="flex items-center justify-center gap-4">
            <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">Celestial Plaza</span>
          </Link>
          <MainNavigation collections={collections} />
        </div>
        <div className="flex flex-wrap">
          <UserButton
            loggedInMember={loggedInMember}
            className="hidden lg:inline-flex"
          />
          <ShoppingCartButton initialData={mainCart} />
        </div>
      </div>
    </header>
  );
}
