const baseUrl = process.env.REACT_APP_BACKEND_LINK;

const addPollTag = async (tagData) => {
    
    const accessToken = localStorage.getItem("accessToken"); 
  
    try {
      const response = await fetch(`${baseUrl}/semantic/insert`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(tagData)
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error in poll tag:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
  
export default addPollTag;