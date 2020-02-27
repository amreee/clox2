const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const http = require('http');
const express = require('express');
const app = express();
const superagent= require('superagent');
const { Canvas }= require('canvas-constructor');
const {resolve , join} = require('path');
const {get} = require('snekfetch');

var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const client = new Client({
    disableEveryone: true
})

// Collections
client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "+help",
            type: "PLAYING"
        }
    }); 
})

client.on("message", async message => {
  
    

   
    
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: process.env.prefix
    };
    
  }
let prefix = prefixes[message.guild.id].prefixes;
  
   if (message.author.bot) return;
    if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.on("guildMemberAdd", async member => {
  
  let username = member.user.username
  let name = username.length > 12 ? username.substring(0,10) + "..." : username;
  async function createCanvas() {
    
    let imageUrlPhoto = /\?size=2048$/g;
    let image = "https://cdn.discordapp.com/attachments/671329636306911234/682361402568212569/card.png";
   let canvas = Canvas.createCanvas(1024, 450),
  ctx = canvas.getContext("2d"),
 let background = await Canvas.loadImage("./assets/img/greetings_background.png");
 let options = { format: "png", size: 512 },
     avatar = await Canvas.loadImage(member.user.displayAvatarURL(options));
// Move the image downwards vertically and constrain its height to 200, so it"s a square
ctx.drawImage(avatar, 45, 90, 270, 270);

let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
channel.send(message, attachment);

    
    return new Canvas(856, 376)
     
    .setColor('#FFFFF')
    .setTextFont('bold 30px Arial')
    .addImage(image, 0, 0, 856, 376)
    .addText(`welcome`, 165, 350)
    .addRoundImage(avatar, 200, 50, 256, 128)
    .toBufferAsync();
    
    
    
  }
  
  
    
    
  
   const welcome = JSON.parse(fs.readFileSync("./welc.json", "utf8"));
  if(!welcome[member.guild.id]){
    welcome[member.guild.id] = {
      welcome: process.env.welcome
    };
  }
  
const welcomechannel = welcome[member.guild.id].welcome;
    const welcomech = member.guild.channels.find(`name`, `${welcomechannel}`);
  welcomech.send(`Hello, <@${member.user.id}> welcome to ${member.guild.name}`,  {
    
   files: [{
     
     attachment: await createCanvas(),
     name:'clox bot welcome message.png'
   }]
    
  });
  
    
     
   
  
 
  
});


client.login(process.env.TOKEN);