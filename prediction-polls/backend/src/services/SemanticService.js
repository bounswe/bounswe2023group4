const axios = require('axios');

async function searchSemanticTags(keyword) {
  const url = "https://www.wikidata.org/w/api.php";

  const params = {
    action: "wbsearchentities",
    language: "en",
    format: "json",
    search: keyword,
  };

  return axios.get(url, { params })
}