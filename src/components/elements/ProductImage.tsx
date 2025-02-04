import Image, { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";
import path from "path";
import fs from "node:fs/promises";
import { ProductType } from "@/types/ProductType";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  product: ProductType;
};
const ProductImage = async ({ product, ...props }: ProductImageProps) => {
  const { className, width, height, sizes } = props;

  // const buffer = await fs.readFile(`./public/products/${product.name}.jpg`);
  const filePath = path.join(
    process.cwd(),
    "public",
    "products",
    `${product.name}.jpg`
  );
  const buffer = await fs.readFile(filePath);
  const { base64 } = await getPlaiceholder(buffer);


  return (
    <Image
      src={`/products/${product.name}.jpg`}
      alt={product.name}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
};

export default ProductImage;
