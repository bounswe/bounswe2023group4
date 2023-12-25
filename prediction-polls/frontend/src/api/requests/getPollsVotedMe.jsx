const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function getPollsVotedMe() {
    const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${baseUrl}/polls/voted/me`, {
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

export default getPollsVotedMe;
