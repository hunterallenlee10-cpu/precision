import Image from "next/image";
import type { Photo as PhotoT } from "@/lib/photos";

type Props = {
  photo: PhotoT;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string; // pass "" for a decorative repeat of a photo already described nearby
  fill?: boolean;
  style?: React.CSSProperties;
};

// Wraps next/image so a photo is never rendered wider than its native size, always has width and
// height (no layout shift) and is lazy-loaded unless it is the hero.
export function Photo({ photo, sizes, className = "", priority, alt, fill, style }: Props) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
      style={{ maxWidth: photo.width, ...style }}
    />
  );
}
