import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

const ImageComponent = ({ publicId }: { publicId: string }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dufftesfc",
    },
  });

  const image = cld.image(publicId).resize(scale().width(300));

  return <img src={image.toURL()} alt="Cloudinary Image" />;
};

export default ImageComponent;
