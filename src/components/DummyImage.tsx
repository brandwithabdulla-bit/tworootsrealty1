import Image from 'next/image';

interface DummyImageProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  aspectRatio?: string;
}

export default function DummyImage({ width = 800, height = 600, className = '', alt = 'Placeholder Image', aspectRatio = '4/3' }: DummyImageProps) {
  // Using placehold.co or picsum for dummy image.
  // We'll use picsum for realistic looking property images.
  // Wait, placehold.co is safer to avoid random irrelevant images.
  // Or we can just render a div if no width/height is given.
  
  return (
    <div className={`photo ${className}`} style={{ aspectRatio }}>
      <Image
        src={`/images/dubai.jpg`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
