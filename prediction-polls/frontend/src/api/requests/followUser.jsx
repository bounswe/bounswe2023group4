const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function followUser(followerId, followedId) {
    const accessToken = localStorage.getItem("accessToken");
    const data = {
        follower_id: followerId,
        followed_id: followedId
      }
  try {
    const response = await fetch(`${baseUrl}/profiles/follow`, {
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

export default followUser;
