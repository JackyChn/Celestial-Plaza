import Image from "next/image";
import Banner from "../../public/banner.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { LitupBorderButton } from "@/components/ui/LitupBorderButton";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        {/* text & button */}
        <div className="flex flex-col items-center justify-center space-y-7 p-10 text-center md:w-1/2">
          <h1>Fill the Gap of your heart</h1>
          <p>
            Feeling alone? Wallet light? Treat yourself to something extravagant
            and turn it all around!
          </p>
          <LitupBorderButton>
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
        <div className="hidden h-full w-1/2 overflow-hidden md:block">
          <Image
            src={Banner}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
