const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function getfollowedList(userId) {
  
    const accessToken = localStorage.getItem("accessToken");
    const data = {
        userId: userId,
      }
      console.log("userIdRequest",data)
  try {
    const response = await fetch(`${baseUrl}/profiles/followed`, {
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

export default getfollowedList;
