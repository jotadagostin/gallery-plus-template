import type React from "react";
import { tv } from "tailwind-variants";

export const imagePreviewVariants = tv({
  base: `
     rounded-lg overflow-hidden    
    `,
});

export const imagePreviewImageVariants = tv({
  base: `
    w-full h-full object-cover
  `,
});

interface ImagePreviewProps extends React.ComponentProps<"img"> {
  imageClassName: string;
}

export default function ImagePreview({
  className,
  ...props
}: ImagePreviewProps) {
  return (
    <div className={imagePreviewVariants({ className })}>
      <img
        {...props}
        alt=""
        className={imagePreviewImageVariants({
          className: props.imageClassName,
        })}
      />
    </div>
  );
}
