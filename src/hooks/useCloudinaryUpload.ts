import { toast } from "react-toastify";

export const useCloudinaryUpload = (file: File): Promise<string | null> => {
  return new Promise(async (resolve) => {
    const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);
    formData.append("folder", "admin_profiles");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary Response:", data);

      if (!data.secure_url) {
        throw new Error("Failed to retrieve image URL from Cloudinary");
      }

      resolve(data.secure_url);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      toast.error("Failed to upload profile picture");
      resolve(null);
    }
  });
};
