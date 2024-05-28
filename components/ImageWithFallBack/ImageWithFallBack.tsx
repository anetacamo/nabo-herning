import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
}

export default function ImageWithFallback({
  src,
  alt,
}: ImageWithFallbackProps) {
  const [imgSrc, set_imgSrc] = useState(src);
  const fallbackSrc = "/images/about.png";

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      alt={alt || "image"}
      layout="fill"
      objectFit="cover"
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
    />
  );
}
