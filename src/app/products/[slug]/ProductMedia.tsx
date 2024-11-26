// Render all images/videos
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import React, { useState } from "react";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]); // points to mainMedia, refer offical doc ref v1, the Product.json does not have it
  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="basis-2/5">
      <div className="aspect-square bg-secondary">
        {selectedImage?.url ? (
          <WixImage
            mediaIdentifier={selectedImage.url}
            alt={selectedImage.altText}
            width={1000}
            height={1000}
          />
        ) : selectedVideo?.url ? (
          <div className="flex size-full items-center bg-black-100">
            <video controls className="size-full">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>
    </div>
  );
}
