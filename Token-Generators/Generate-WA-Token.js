const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LegacySessionAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
    console.log(JSON.stringify(session))
    throw new Error("Copy the above token!");
})

client.initialize();