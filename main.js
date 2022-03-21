//Made by bunny

const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const { connect_to_db, UpdateMessage_ID, mongodb_initialize } = require('./Scripts/MongoDB');
const { GetMessage, ListMessages, GetUpdates } = require('./Scripts/GmailAPI');
require('dotenv').config();


let logo = `
/$$      /$$  /$$$$$$          /$$$$$$ /$$   /$$ /$$$$$$$   /$$$$$$  /$$   /$$
| $$  /$ | $$ /$$__  $$        |_  $$_/| $$$ | $$| $$__  $$ /$$__  $$| $$  / $$
| $$ /$$$| $$| $$  \\ $$          | $$  | $$$$| $$| $$  \\ $$| $$  \\ $$|  $$/ $$/
| $$/$$ $$ $$| $$$$$$$$ /$$$$$$  | $$  | $$ $$ $$| $$$$$$$ | $$  | $$ \\  $$$$/ 
| $$$$_  $$$$| $$__  $$|______/  | $$  | $$  $$$$| $$__  $$| $$  | $$  >$$  $$ 
| $$$/ \\  $$$| $$  | $$          | $$  | $$\\  $$$| $$  \\ $$| $$  | $$ /$$/\\  $$
| $$/   \\  $$| $$  | $$         /$$$$$$| $$ \\  $$| $$$$$$$/|  $$$$$$/| $$  \\ $$
|__/     \\__/|__/  |__/        |______/|__/  \\__/|_______/  \\______/ |__/  |__/
                        GMail inbox client for WhatsApp                --by bunny
`

async function main() {

    console.log(logo);

    var global_id = { id: null };

    let owner = process.env.owner + '@c.us';

    let Collection = await connect_to_db();

    let bot_status = 0;

    global_id.id = await mongodb_initialize(Collection)
    console.log('Global ID : ',global_id.id)

    //console.log(process.env.wa_token)
    const temp = JSON.parse(process.env.wa_token)

    const client = new Client({
        authStrategy: new LegacySessionAuth({ session: temp }),
        puppeteer: { headless: true, args: ["--no-sandbox"] }
    });

    client.initialize();

    client.on('ready', () => {
        console.log('Send !start command to the bot using the owners number.');
    });

    client.on('authenticated', (session) => {
        console.log("Whatsapp authenticated.")
    });

    client.on('message', async msg => {
        if(msg.from == owner && msg.body == '!start') {
            if(bot_status == 0) {
                bot_status = 1;
                msg.reply(`\`\`\`Bot has been started and will send the last 10 emails if its the first time otherwise it will wait for the arrival of new emails!\`\`\``);
                console.log('Waiting for new emails to arrive :D ...');
                setInterval(submain, 60000)
            }
            else {
                msg.reply(`\`\`\`beep! boop!\`\`\``);
            }
        }

        if (msg.body === '!ping' && msg.from == owner) {
            msg.reply('pong!');
        }
    });

    async function submain() {

        let NewMessages = [];
        NewMessages = await GetUpdates(global_id);
        NewMessages.reverse();
        if (NewMessages.length > 0) {
            console.log('New message ids:', NewMessages);
            for (const element of NewMessages) {
                let msg = await GetMessage(element)
                let promise = await client.sendMessage(owner, msg)
                console.log('Message sent!')
            }
            console.log('Updating DB with new message ID :',NewMessages[NewMessages.length - 1]);
            global_id.id = NewMessages[NewMessages.length - 1];
            await UpdateMessage_ID(Collection ,NewMessages[NewMessages.length - 1])
            console.log('Waiting for new emails to arrive :D ...');;
        }

    }

}

main()
