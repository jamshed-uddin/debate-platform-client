"use client";
import Image from "next/image";
import React from "react";
interface ImageComponentProps {
  src: string;
  alt: string;
  height: number;
  width: number;
}
const ImageComponent = ({ src, alt, height, width }: ImageComponentProps) => {
  return (
    <Image
      src={
        src ||
        "https://i0.wp.com/newspack-coloradosun.s3.amazonaws.com/wp-content/uploads/2022/10/e22-debate.png?%2C600&quality=100&ssl=1"
      }
      alt={alt}
      height={height}
      width={width}
      className="w-full h-full object-cover object-top"
      onError={(e) => {
        e.currentTarget.src =
          "https://i0.wp.com/newspack-coloradosun.s3.amazonaws.com/wp-content/uploads/2022/10/e22-debate.png?%2C600&quality=100&ssl=1";
      }}
    />
  );
};

export default ImageComponent;
