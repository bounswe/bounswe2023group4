const cron = require('node-cron');
const axios = require('axios');
const topics = require('./topics.json');
const {getUntaggedPolls, updateTagsScanned, addTopic} = require('../repositories/PollDB');
require('dotenv').config();

const scoreThreshold = 0.85;

async function tagRoutine() {
  const doTag = process.env.DO_TAG === 'true';

  console.log('tagRoutine Running');

  if (!doTag) {
    console.log('DO_TAG is set to false. tagRoutine will do nothing.');
    return;
  }

  const apiUrl = process.env.TAG_API_URL;

  if (!apiUrl) {
    console.error('TAG_API_URL is not defined in the environment variables.');
    return;
  }

  const untaggedPolls = await getUntaggedPolls();

  const filteredPolls = untaggedPolls.filter(poll => poll.tagsScanned >= 0 && poll.tagsScanned < topics.topics.length);
  if (filteredPolls.length === 0) {
    console.log("No polls to tag.");
    return;
  }
  console.log(filteredPolls);
  const randomPoll = filteredPolls[Math.floor(Math.random() * filteredPolls.length)];
  console.log(randomPoll);
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
  })
  .then(response => {
    const filteredLabels = response.data.labels.filter((label, index) => response.data.scores[index] > scoreThreshold);

    updateTagsScanned(pollId, tagsScanned + additionalScans)
    if (filteredLabels.length > 0) {
      addTopic(pollId, filteredLabels[0])
    }

  })
  .catch(error => {

    console.error('Error:', error.message);
  });
}

// Schedule the routine to run every 30 seconds
cron.schedule('*/30 * * * * *', tagRoutine);

module.exports = tagRoutine;
