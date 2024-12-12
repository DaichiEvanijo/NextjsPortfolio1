import Image from "next/image";
import { twMerge } from "tailwind-merge";

const DynamicImage = ({
  url,
  sizes,
  ...props
}: React.ComponentProps<"div"> & { url: string; sizes: string }) => {
  const { className, ...others } = props;

  return (
    <>
      <div {...others} className={twMerge("relative", className)}>
        <Image
          src={url}
          alt={`image`}
          className="object-contain"
          fill
          sizes={sizes}
        />
      </div>
    </>
  );
};

export default DynamicImage;
