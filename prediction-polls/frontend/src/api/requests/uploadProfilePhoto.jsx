

const baseUrl = process.env.REACT_APP_BACKEND_LINK;

async function uploadProfilePhoto(file, caption) {
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);

  try {
    const response = await fetch(`${baseUrl}/profiles/profilePhoto`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error uploading profile photo:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
}

export default uploadProfilePhoto;
