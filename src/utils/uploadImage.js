export const uploadImage = async (imageFile) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    return null;
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.success) {
    return data.data.url;
  }

  return null;
};