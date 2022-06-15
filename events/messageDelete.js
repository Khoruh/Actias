const Discord = require("discord.js")
const fs =  require("fs")
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
  });
module.exports = {
  name: 'messageDelete',
    async execute(message) {
        //Get Channel For Logging, replace with config file at later date?    
        var guildConfig = (`./guildConfig/${message.guild.id}/settings.json`)
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = message.guild.channels.cache.get(channelID)
        //Create The Embed To Send
        const deleteEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "A Message Was Deleted",
            fields: [
            { name: `Deleted Message`, value: `${message.content}`},
            { name: `Message Author`, value: `${message.author}`},
            { name: `In Channel`, value: `${message.channel}`}
          ],
            timestamp: new Date(),
            })
            //Send Embed
            if(!modlog) return
            modlog.send({embeds: [deleteEmbed]})
          
    }
}