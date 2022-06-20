const fs = require('fs');
const path = require('node:path');
const Discord = require('discord.js');
const config = require('./configFiles/config.json');

const timestamp = require('unix-timestamp');

const { DiscordTogether } = require('discord-together');

global.client = new Discord.Client({
  intents: new Discord.Intents(32767)
});

client.discordTogether = new DiscordTogether(client);

const { Player } = require("discord-player");
const { ConsoleMessage } = require('puppeteer');
global.player = new Player(client)
//Command stuff, gonna be honest, hardly know how this works.
client.commands = new Discord.Collection();
const commandsPath = './commands'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (var file of commandFiles) {
	var filePath = (`${commandsPath}/${file}`);
	var command = require(filePath);
	client.commands.set(command.data.name, command);
}
//Logs handling
client.logs = new Discord.Collection();
const logsPath = './events'
const logFiles = fs.readdirSync(logsPath).filter(file => file.endsWith('.js'))
for (var file of logFiles) {
  var filePath = (`${logsPath}/${file}`)
  var log = require(filePath)
  client.logs.set(log.name, log)
}
//Context Menus
client.contextMenus = new Discord.Collection();
const contextPath = './contextMenus'
const contextFiles = fs.readdirSync(contextPath).filter(file => file.endsWith('.js'));

for (var file of contextFiles) {
	var filePath = (`${contextPath}/${file}`);
	var contextMenu = require(filePath);
  client.contextMenus.set(contextMenu.data.name, contextMenu)
}
//Modals
//Wait For Ready
client.on('ready', () => {
    console.log(`${client.user.username} is ready to go!`);
    
});

client.on("interactionCreate", async interaction => {


//Modal Handling 
//Button Handling
 if(interaction.isButton()) {
   if(interaction.customId === "hammertime") {
     interaction.reply({
       content: "HammerTime is a form of markdown that converts a timestamp to your local timezone. Easy conversions for everyone :D",
       ephemeral: true
     })
   }
   if(interaction.customId === "delete") {
     interaction.message.delete()
   }
  
}
//Context Menu Handling
 else if(interaction.isContextMenu()) { 
  var contextMenu = client.contextMenus.get(interaction.commandName);

  if(!contextMenu) return;
    try {
      await contextMenu.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

}
//User Context Menu Handling
 else if(interaction.isUserContextMenu()) {

}
//Slash Command Handling
 else if(interaction.isCommand()) {
    var command = client.commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  };
})
//Moderation Logs
client.on("messageDelete", async message => {
  var log = client.logs.get("messageDelete");
 try {
   await log.execute(message)
 } catch (error) {
   console.log(error)
 }
})
client.on("messageUpdate", async (oldMessage, newMessage) => {
  var log = client.logs.get("messageEdit");
 try {
   await log.execute(oldMessage, newMessage)
 } catch (error) {
   console.log(error)
 }
})
//Time conversion
client.on("messageCreate", async message => {
  var log = client.logs.get("conversion");
  try {
    await log.execute(message)
  } catch (error) {
    console.log(error)
  }
})
client.on("messageCreate", async message => {
  if (message.content === `!start`) {
    if(message.member.voice.channel) {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
        return message.channel.send(`${invite.code}`);
        });
    };
};
})
client.on("messageCreate", async message => {
  if (message.content === `!start2`) {
    if(message.member.voice.channel) {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {
        return message.channel.send(`${invite.code}`);
    });
    };
};
})
client.on('messageCreate', async message => {
  if (message.content === '!start3') {
      if(message.member.voice.channel) {
          client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'sketchheads').then(async invite => {
              return message.channel.send(`${invite.code}`);
          });
      };
  };
});
player.on("trackStart", (queue, track) => {
  const playEmbed = new Discord.MessageEmbed({
    color: 3447003,
    title: `Now Playing ${track.title}`,
    timestamp: new Date(),
})
  queue.metadata.channel.send({
    embeds: [playEmbed]
  })
})
client.login(config.token);