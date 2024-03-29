const cron = require('node-cron');
const axios = require('axios');
const topics = require('./topics.json');
const {getUntaggedPolls, updateTagsScanned, addTopic} = require('../repositories/PollDB');
require('dotenv').config();

const scoreThreshold = 0.85;

async function tagRoutine() {
  const doTag = process.env.DO_TAG === 'true';


  if (!doTag) {
    console.log('Tag Routine : DO_TAG is set to false. Tag Routine will do nothing.');
    return;
  }

  const apiUrl = process.env.TAG_API_URL;
  const apiToken = process.env.TAG_API_TOKEN;

  if (!apiUrl) {
    console.error('Tag Routine : TAG_API_URL is not defined in the environment variables.');
    return;
  }

  const untaggedPolls = await getUntaggedPolls();

  const filteredPolls = untaggedPolls.filter(poll => poll.tagsScanned >= 0 && poll.tagsScanned < topics.topics.length);
  if (filteredPolls.length === 0) {
    console.log("Tag Routine : No polls to tag.");
    return;
  }
  const randomPoll = filteredPolls[Math.floor(Math.random() * filteredPolls.length)];
  const pollId = randomPoll.id;
  const pollQuestion = randomPoll.question;
  const tagsScanned = randomPoll.tagsScanned;

  const batchSize = 10; // the api accepts at most 10 candidate_labels
  const topicsBatch = topics.topics.slice(tagsScanned, tagsScanned + batchSize);
  const additionalScans = topicsBatch.length;

  const candidateLabels = topicsBatch.map(topic => topic.name).join(', ');

  axios.post(apiUrl, {
    // inputs: "What will be the result of the Besiktas vs. Fenerbahce football match at 9.12.2023?",
    inputs: pollQuestion,
    parameters: {
      candidate_labels: candidateLabels,
      multi_label: true
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`
    }
  })
  .then(response => {
    const filteredLabels = response.data.labels.filter((label, index) => response.data.scores[index] > scoreThreshold);

    updateTagsScanned(pollId, tagsScanned + additionalScans)
    filteredLabels.map((label) => {
      addTopic(pollId, label)
    });
  })
  .catch(error => {

    console.error('Tag Routine : Error:', error.message);
  });
}

// Schedule the routine to run every 30 seconds
cron.schedule('*/30 * * * * *', tagRoutine);

module.exports = tagRoutine;
