import DynamicImage from "./DynamicImage";

const PreviewImages = ({ previewUrls }: { previewUrls: string[] }) => {
  return (
    <>
      {previewUrls.length > 0 && previewUrls.filter(url => url !== "").map((url, index) => (
        <DynamicImage  className="w-[100px] h-[100px]" url={url} key={index} sizes="100px"/>
      ))}
    </>
  );
};

export default PreviewImages;
