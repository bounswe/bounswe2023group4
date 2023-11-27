const baseUrl = process.env.REACT_APP_BACKEND_LINK;

const updateProfile = async (userData) => {
    
    const accessToken = localStorage.getItem("accessToken"); 
  
    try {
      const response = await fetch(`${baseUrl}/profiles`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error in updateProfile:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
  
export default updateProfile;