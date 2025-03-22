// import axios from "axios";
// import { useState, useEffect } from "react";

// const fetchImage = async (publicId: string): Promise<string | null> => {
//   try {
//     const response = await axios.get(
//       `https://res.cloudinary.com/dufftesfc/image/upload/${publicId}.jpg`
//     );

//     return response.config.url || null;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return null;
//   }
// };

// const ImageComponent = ({ publicId }: { publicId: string }) => {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const getImage = async () => {
//       const url = await fetchImage(publicId);
//       setImageUrl(url);
//     };

//     getImage();
//   }, [publicId]);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {imageUrl ? (
//         <img src={imageUrl} alt="Fetched" className="w-40 h-40 object-cover" />
//       ) : (
//         <p>Loading image...</p>
//       )}
//     </div>
//   );
// };

// export default ImageComponent;
