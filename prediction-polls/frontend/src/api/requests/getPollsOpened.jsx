const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function getPollsOpened(username) {
    const accessToken = localStorage.getItem("accessToken");
    const url = username ? `${baseUrl}/polls/opened?username=${username}` : `${baseUrl}/polls/opened`;
  try {
    const response = await fetch(url, {
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

export default getPollsOpened;
