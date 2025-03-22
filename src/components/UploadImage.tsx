import { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle image upload
  const uploadImage = async () => {
    if (!file) return;
    console.log(file);

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    console.log(formData);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dufftesfc/image/upload",
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={uploadImage} disabled={loading}>
        Upload
      </button>
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadImage;
