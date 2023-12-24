const baseUrl = process.env.REACT_APP_BACKEND_LINK; 

async function sendJuryAnswer(JuryAnswer) {
    const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${baseUrl}/moderators/my-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(JuryAnswer)
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

export default sendJuryAnswer;
