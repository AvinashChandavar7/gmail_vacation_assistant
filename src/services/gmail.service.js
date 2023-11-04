const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

//! Define the required Gmail API scopes and label names
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://mail.google.com/",
];


const LABEL_NAME = "Vacation-Mails";

//! Authenticate with the Gmail API
async function authenticateGmail() {
  const credentials = await fs.readFile('credentials.json');
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../../credentials.json"),
    scopes: SCOPES,
  });
  return auth;
}

//! Create a Gmail label for processing
async function createLabel(auth) {
  console.log('Function createLabel has been called');
  const gmail = google.gmail({ version: 'v1', auth })

  try {
    const response = await gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name: LABEL_NAME,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });

    return response.data.id;

  } catch (err) {

    throw err;

  }
}


//! Add a label to a Gmail message
async function addLabel(auth, message, labelId) {
  console.log('Function addLabel has been called');
  const gmail = google.gmail({ version: 'v1', auth });

  try {

    const response = await gmail.users.messages.modify({
      userId: "me",
      id: message.id,
      requestBody: {
        addLabelIds: [labelId],
        removeLabelIds: ['INBOX'],
      }
    });

    return response;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


//! Get unreplied email messages from the Gmail inbox
async function getUnrepliedMessages(auth) {
  console.log('Function getUnrepliedMessages has been called');

  const gmail = google.gmail({ version: "v1", auth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      labelId: ["INBOX"],
      q: '-in:chats -from:me -has:userlabels'
    });

    return response.data.messages || [];

  } catch (error) {
    console.log(error);
    throw error;
  }

}


//! Send a reply to an email message
async function sendReply(auth, message) {
  console.log('Function sendReply has been called');

  const gmail = google.gmail({ version: 'v1', auth });

  try {
    //* Retrieve email subject and sender information
    const response = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
      format: 'metadata',
      metadataHeaders: ["Subject", "From"],
    });

    const subject = response.data.payload.headers.find(
      (header) => header.name === "Subject"
    ).value;

    const from = response.data.payload.headers.find(
      (header) => header.name === "From"
    ).value;

    //* Extract the reply recipient's email address
    const replyTo = from.match(/<(.*)>/)[1];

    //* Create a reply subject
    const replySubject = subject
      .startsWith('Re:') ? subject : `Re : ${subject}`;

    //* Compose the reply message
    const replyBody = `Hello,\n\nThank you for reaching out.\n\nI wanted to let you know that I am currently on vacation and may not be able to respond immediately. I appreciate your message and will get back to you as soon as I return.\n\nIn the meantime, if you have any urgent matters, please feel free to contact [Alternative Contact Person's Name] at [Alternative Contact Person's Email].\n\nThank you for your understanding.\n\nBest regards,\nAvinash`;

    //* Construct the raw email message template  
    const rawMessage = [
      `From: me`,
      `To: ${replyTo}`,
      `Subject: ${replySubject}`,
      `In-Reply-To: ${message.id}`,
      `References: ${message.id}`,
      '',
      replyBody,
    ].join('\n');

    //* Encode the message for sending
    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    //* Send the reply
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    return res;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


module.exports = {
  getUnrepliedMessages,
  addLabel,
  createLabel,
  sendReply,
  authenticateGmail
};