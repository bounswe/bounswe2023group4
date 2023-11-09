// authService.js
const baseUrl = process.env.REACT_APP_BACKEND_LINK; // Replace with your actual base URL

async function googleLogin(code) {
  try {
    const response = await fetch(`${baseUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'code': code })
    });

    if (response.ok) {
      // Clear access token and refresh token from local storage (or wherever you've stored them)
      
      console.log('success')
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export default googleLogin;
