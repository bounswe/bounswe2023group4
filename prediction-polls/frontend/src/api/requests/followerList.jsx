const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function getfollowerList(userId) {
    const accessToken = localStorage.getItem("accessToken");
    const data = {
        userId: userId,
      }
  try {
    const response = await fetch(`${baseUrl}/profiles/follower`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
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

export default getfollowerList;
