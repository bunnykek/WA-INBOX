![WA-INBOX](https://github.com/bunnykek/WA-INBOX/blob/main/Assets/logo.svg "WA-INBOX")
# WA-INBOX
## Features

- Forwards new arrived emails from Gmail to WhatsApp.

## How to use?

First of all we have to grab tokens from these three services, Google Cloud Platform, WhatsApp-web, MongoDB.   
The procedures are given in WiKi tab.   
[1. Getting Gmail tokens](https://github.com/bunnykek/WA-INBOX/wiki#1-getting-gmail-tokens)   
[2. Getting WhatsApp web token](https://github.com/bunnykek/WA-INBOX/wiki#2-getting-whatsapp-web-token)   
[3. MongoDB URL](https://github.com/bunnykek/WA-INBOX/wiki#3-mongodb-url)    

You can deploy it anywhere, all you need is [Node.js](https://nodejs.org/) and a VPS/RDP

## Heroku Deploy   
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bunnykek/WA-INBOX)
    
Important note for heroku users:    
Make sure to go to the deployed application's `Resources` tab and disable the `web` and enable the `worker`.     
    
<img src="https://user-images.githubusercontent.com/67633271/159228071-af14ac62-b867-4271-83c8-1a075bf2bab7.png" width="1000">    
      
There are only two commands:`!start` and `!ping`       
After the successful deploy you `must have to` send `!start` to the bot using the owner's whatsapp.
