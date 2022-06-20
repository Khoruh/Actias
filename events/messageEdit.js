const Discord = require("discord.js")
const fs =  require("fs")
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
  });
module.exports = {
  name: 'messageEdit',
    async execute(oldMessage, newMessage) {
        //Check if message has a link, image, or embed, 
        //links embedding counts as an edit and will send a log otherwise
        //edited embeds are empty fields that wont get sent correctly
        //images are the same as embeds and links
        if(newMessage.attachments > 0 && newMessage.content === null) {
          console.log(newMessage)
        }
        if(oldMessage.content.includes("http://") || oldMessage.content.includes("https://")) return
        if(newMessage.embeds > 0) return
        //Get Channel For Logging, replace with config file at later date?    
        var guildConfig = (`./guildConfig/${oldMessage.guild.id}/settings.json`)
        if(!guildConfig) return
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = oldMessage.guild.channels.cache.get(channelID)
        //Create The Embed To Send
        var oldContent = oldMessage.content
        var newContent = newMessage.content
        if(!oldContent) {
         var oldContent = "No old message."
        }
        if(!newContent) {
          var newContent = "Message content removed or non-existent."
        }
        const editEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "A Message Was Edited",
            fields: [
            { name: `Message Author`, value: `${oldMessage.author}`},
            { name: `Old Message`, value: `${oldContent}`},
            { name: `New Message`, value: `${newContent}`},
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