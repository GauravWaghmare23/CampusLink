export const uploadToCloudinary = async (imageUri: string) => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    } as any);

    formData.append("upload_preset", "campuslink_unsigned");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dfm8093cs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("Cloudinary response:", data);

    if (!data.secure_url) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};