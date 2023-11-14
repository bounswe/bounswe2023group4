const baseUrl = process.env.REACT_APP_BACKEND_LINK;
async function googleLogin(code) {
  try {
    const response = await fetch(`${baseUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'code': code })
    });
    const data = await response.json();
    if (response.status === 200 && data.accessToken && data.refreshToken) {
      localStorage.setItem('accessToken', data.accessToken); 
      localStorage.setItem('refreshToken', data.refreshToken);
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return false;
  }
}

export default googleLogin;