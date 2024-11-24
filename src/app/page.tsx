import Image from "next/image";
import Banner from "../../public/banner.jpg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LitupBorderButton } from "@/components/ui/LitupBorderButton";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { TextRevealCard } from "@/components/ui/TextRevealCard";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import { getWixClient } from "@/lib/wix-client.base";
import { collections, products } from "@wix/stores";
import Product from "@/components/Product";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary bg-sky-100 md:h-96">
        {/* text & button */}
        <div className="flex flex-col items-center justify-center space-y-7 p-10 text-center md:w-1/2">
          {/* <h1 className="text-3xl font-bold md:text-4xl">
            Fill the Gap of your heart
          </h1> */}
          <TextRevealCard
            text="Wanna do some shopping?"
            revealText="Fill the Gap of your heart!"
          />
          <TextGenerateEffect
            className=""
            words="Feeling alone? Wallet light? Treat yourself to something extravagant
            and turn it all around!"
            duration={1}
          />

          <LitupBorderButton otherClasses="bg-gradient-to-r from-cyan-500 to-blue-500 ">
            <Link
              href={"/shop"}
              className="flex items-center justify-center gap-2"
            >
              <p>Shop now!</p>
              <ArrowRight className="size-5" />
            </Link>
          </LitupBorderButton>
        </div>

        {/* image on the right */}
        <div className="relative hidden h-full w-1/2 overflow-hidden md:block">
          <Image
            src={Banner}
            alt="banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-100 via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  await delay(1000);

  const wixClient = getWixClient();
  // get featured collections by featured name
  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");
  if (!collection?._id) return null;

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  // no product found
  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="felx grid-cols-2 flex-col sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
