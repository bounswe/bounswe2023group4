const axios = require('axios');
const db = require('../repositories/SemanticDB.js');
const {getPollWithId} = require('../repositories/PollDB.js');
const {createPollsJson} = require('../services/PollService.js');

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

async function getPollsForKeyword(req, res) {
  const keyword = req.query.keyword;
  const semanticTags = await searchSemanticTags(keyword);
  const searchArray = semanticTags.data.search;
  if (searchArray) {
    const semanticTags = searchArray.map(element => {
      return element.id;
    });

    const pollsPromises = await semanticTags.map(async semanticTag => {
      return db.findPollsForSemanticTag(semanticTag);
    })

    const polls = await Promise.all(pollsPromises);
    const pollList = [...new Set(polls.flat())];

    console.log("semanticTags: ", semanticTags)
    console.log("polls returned: ", polls)
    console.log("pollList returned: ", pollList)

    const pollJSONListPromises = pollList.map(pollId => {
      return getPollWithId(pollId);
    })

    const pollJSONList = await Promise.all(pollJSONListPromises);

    const response = await createPollsJson(pollJSONList.flat());

    res.json(response)
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

module.exports = {getTagsForKeyword, insertTag, getPollsForKeyword}