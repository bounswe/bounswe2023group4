const baseUrl = process.env.REACT_APP_BACKEND_LINK;

const badgeSelect = async (badgeData) => {
    
    const accessToken = localStorage.getItem("accessToken"); 
    console.log("badgeData", badgeData)
  
    try {
      const response = await fetch(`${baseUrl}/profiles/badges/me`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(badgeData)
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error in badgeSelect:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
  
export default badgeSelect;