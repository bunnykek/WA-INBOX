![WA-INBOX](https://github.com/bunnykek/WA-INBOX/blob/main/Assets/logo.svg "WA-INBOX")
# WA-INBOX
## Features

- Forwards new arrived emails from Gmail to WhatsApp.

It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

`NOTE:` I can't guarantee you will not be blocked by using this method, although it has worked for me and I personally never got blocked. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## How to use?

First of all we have to grab tokens from these three services, Google Cloud Platform, WhatsApp-web, MongoDB.   
The procedures are given in WiKi tab.   
[1. Getting Gmail tokens (client_id, client_secret, refresh_token)](https://github.com/bunnykek/WA-INBOX/wiki#1-getting-gmail-tokens)   
[2. Getting WhatsApp web token (wa_token)](https://github.com/bunnykek/WA-INBOX/wiki#2-getting-whatsapp-web-token)   
[3. MongoDB URL (url)](https://github.com/bunnykek/WA-INBOX/wiki#3-mongodb-url)    

You can deploy it anywhere, all you need is [Node.js](https://nodejs.org/) and a VPS/RDP   
Also make sure to add these environment variables:
```
client_id = ''  //Get it from credentials.json
client_secret = '' //Get it from credentials.json
refresh_token = '' //Get it from Generate-Gmail-Token
url = '' //MongoDB url
wa_token = '' //Whatsapp-web token
owner = '' //The person who will receive the email-messages. Ex: 919756xxx890 (including country code but exclude plus sign)
ignore_links = 'true'  //true, if you want to ignore agressive hyperlinks. Improves readability.
```
## Heroku Deploy   
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bunnykek/WA-INBOX)
    
Important note for heroku users:    
Make sure to go to the deployed application's `Resources` tab and disable the `web` and enable the `worker`.     
    
<img src="https://user-images.githubusercontent.com/67633271/159228071-af14ac62-b867-4271-83c8-1a075bf2bab7.png" width="1000">    
      
There are only two commands:`!start` and `!ping`       
After the successful deploy you `must have to` send `!start` to the bot using the owner's whatsapp.

## Credits
[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/) the bot is completely based on this library.    
[Google Cloud Platform](https://console.cloud.google.com/) for Gmail API.
