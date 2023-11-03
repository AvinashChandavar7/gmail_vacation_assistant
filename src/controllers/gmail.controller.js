const {
  authenticateGmail,
  createLabel,
  addLabel,
  getUnrepliedMessages,
  sendReply
} = require("../services/gmail.service.js");

//! This function handles incoming requests and manages Gmail-related tasks
async function mainGmail(req, res) {

  //* Authenticate with Gmail API
  const auth = await authenticateGmail();


  //* Create a label for processing
  const labelId = await createLabel(auth);
  console.log(`Label has been created: ${labelId}`);

  //* Set up a periodic check for unreplied messages
  setInterval(async () => {
    // Get unreplied messages
    const messages = await getUnrepliedMessages(auth);
    console.log(`Found ${messages.length} unreplied messages`);

    //* Process each unreplied message
    for (const message of messages) {
      await processMessage(auth, message, labelId)
    }

  }, getRandomInterval(45, 120) * 1000); //* Random interval between 45 and 120 seconds

  //* Respond to the client
  res.send("You have successfully subscribed to our gmail service.");
}

//! Generate a random interval between min and max values
function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


//! This function processes an email message by "replying" to it and "adding a label".
async function processMessage(auth, message, labelId) {
  //* Send a reply to the message
  await sendReply(auth, message);
  console.log(`Sent reply to message with id ${message.id}`);

  //* Add the label to the message
  await addLabel(auth, message, labelId);
  console.log(`Added label to message with id ${message.id}`);
}




module.exports = { mainGmail };