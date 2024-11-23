import Image from "next/image";
import Banner from "../../public/banner.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1>Fill the Gap of your heart</h1>
          <p>
            Feeling alone? Wallet light? Treat yourself to something extravagant
            and turn it all around!
          </p>
          <Button asChild>
            <Link href={"/shop"}>
              Shop now! <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
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
