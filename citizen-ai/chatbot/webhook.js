const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(`Welcome to Citizen AI! How can I assist you today?`);
  }

  function reportProblem(agent) {
    const problemType = agent.parameters.problemType;
    agent.add(`You mentioned ${problemType}. Please describe the issue.`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Report Problem', reportProblem);

  agent.handleRequest(intentMap);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));