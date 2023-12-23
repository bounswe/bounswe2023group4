const axios = require('axios');
const db = require('../repositories/SemanticDB.js');

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

async function getTagsForKeyword(req, res) {
  const keyword = req.query.keyword;
  const semanticTags = await searchSemanticTags(keyword);
  console.log(semanticTags.data.search)
  const searchArray = semanticTags.data.search;
  if (searchArray) {
    const responseArray = searchArray.map(element => {
      return { id: element.id, label: element.display.label.value, description: element.display.description.value };
    });

    console.log(responseArray)
    res.json(responseArray)
  } else {
    res.json([])
  }
}

async function insertTag(req, res) {
  const pollId = req.body.pollId;
  const semanticTag = req.body.semanticTag;

  try {
    if (!pollId || !semanticTag) {
      throw {error: "Bad request, need pollId and semanticTag."};
    }
    const insertId = await db.addSemanticTagForPoll(semanticTag, pollId);

    res.json({insertId: insertId, success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

module.exports = {getTagsForKeyword, insertTag}