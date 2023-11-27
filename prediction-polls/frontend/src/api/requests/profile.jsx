const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function getProfile(profileId) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${baseUrl}/profiles/?username=${profileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return false;
  }
}

export default getProfile;
