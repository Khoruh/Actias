const Discord = require("discord.js")
const fs =  require("fs")
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
  });
module.exports = {
  name: 'messageEdit',
    async execute(oldMessage, newMessage) {
        //Check if message has a link, links embedding counts as an edit and will send a log otherwise
        if(oldMessage.content.startsWith("http://") || oldMessage.content.startsWith("https://")) return
        if(oldMessage.embeds > 0 || newMessage.embeds > 0) return
        //Get Channel For Logging, replace with config file at later date?    
        var guildConfig = (`./guildConfig/${oldMessage.guild.id}/settings.json`)
        if(!guildConfig) return
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = oldMessage.guild.channels.cache.get(channelID)
        //Create The Embed To Send
        const editEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "A Message Was Edited",
            fields: [
            { name: `Message Author`, value: `${oldMessage.author}`},
            { name: `Old Message`, value: `${oldMessage.content}`},
            { name: `New Message`, value: `${newMessage.content}`},
            { name: `In Channel`, value: `${newMessage.channel}`},
            { name: `Message Link`, value: `${newMessage.url}`}
          ],
            timestamp: new Date(),
            })
            //Send Embed
            if(!modlog) return
            modlog.send({embeds: [editEmbed]})
          
    }
}