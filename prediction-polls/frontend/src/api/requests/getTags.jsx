const baseUrl = process.env.REACT_APP_BACKEND_LINK;

async function getTags({keyword}) {
    const accessToken = localStorage.getItem("accessToken");
    const url = keyword ? `${baseUrl}/semantic/tagsearch?keyword=${keyword}` : `${baseUrl}/semantic/tagsearch`;
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

export default getTags;
