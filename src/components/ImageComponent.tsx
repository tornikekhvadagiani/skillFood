import { Image } from "cloudinary-react";

const ImageComponent = ({ publicId }: { publicId: string }) => {
  return (
    <Image cloudName="dufftesfc" publicId={publicId} width="300" crop="scale" />
  );
};

export default ImageComponent;
