// authService.js
const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function logout(refreshToken) {
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      // Clear access token and refresh token from local storage (or wherever you've stored them)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export default logout;
