//by bunny

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { base64encode, base64decode } = require('nodejs-base64');
const { connect_to_db, UpdateMessage_ID, mongodb_initialize } = require('./MongoDB');
const { resolve } = require('path');
const { mainModule } = require('process');
require('dotenv').config();
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const client_id = process.env.client_id
const client_secret = process.env.client_secret
const refresh_token = process.env.refresh_token


const authorize = () => {
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret)
  oAuth2Client.setCredentials({ refresh_token: refresh_token })
  return oAuth2Client
}


const ListMessages = async () => {
  let arr = []
  let auth = await authorize()
  const gmail = await google.gmail({ version: 'v1', auth })
  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10,
    q: 'in:inbox'
  })

  const Messages = res.data.messages;
  if (Messages.length) {
    Messages.forEach((message) => {
      arr.push(message.id)
    })
  } else {
    console.log('No messages found.');
  }
  return (arr)
}


const GetMessage = async (message_id) => {
  auth = await authorize()
  const gmail = await google.gmail({ version: 'v1', auth });
  var res = await gmail.users.messages.get({
    userId: 'me',
    id: `${message_id}`
  })
  //console.log(JSON.stringify(res));
  //console.log(message_id);
  let tags = ''
  res.data.labelIds.forEach(tag => { tags += `#${tag} ` })
  let main_body = ''
  try {
    main_body = base64decode(res.data.payload.parts[0].body.data.toString());
  } catch {
    main_body = base64decode(res.data.payload.parts[0].parts[0].body.data.toString());
  }

  if (process.env.ignore_links == 'true') {
    main_body = main_body.replace(/<[^ ]+>/gm, '')
  }
  let txt = `*${res.data.payload.headers.find(part => part.name == "Subject").value}*

*From : ${res.data.payload.headers.find(part => part.name == "From").value}*
*Date : ${res.data.payload.headers.find(part => part.name == "Date").value}*

*Body:*
${main_body}

${tags}`
  return (txt);
}


async function GetUpdates(current_id) {
  var Messages_ids = new Array();
  Messages_ids = await ListMessages().then((k) => { return (k) });
  //console.log('Last 10 message ids:', Messages_ids);
  let fresh_ids = new Array();
  for (i = 0; i < Messages_ids.length; i++) {
    if (Messages_ids[i] != current_id.id) {
      fresh_ids.push(Messages_ids[i]);
    }
    else break;
  }

  return (fresh_ids)

};


module.exports = { GetMessage, ListMessages, GetUpdates }