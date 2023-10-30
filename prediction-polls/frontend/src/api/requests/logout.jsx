// authService.js
const baseUrl = 'http://3.70.206.103:8000'; // Replace with your actual base URL

async function logout(refreshToken) {
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      // Clear access token and refresh token from local storage (or wherever you've stored them)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return true;
    } else {
      console.error('Logout failed', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Logout error', error);
    return false;
  }
}

export default logout;
