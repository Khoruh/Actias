const Discord = require("discord.js")
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
  });
module.exports = {
    async execute(message) {
        //Get Channel For Logging, replace with config file at later date?
        var logChannel = message.guild.channels.cache.get("977167667511308368")
        //Create The Embed To Send
        const deleteEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "Deleted Message",
            description: `A Message was Deleted.`,
            fields: [
            { name: `Deleted Message`, value: `${message}`},
            { name: `Message Author`, value: `${message.author}`},
          ],
            timestamp: new Date(),
            })
            //Send Embed
            logChannel.send({embeds: [deleteEmbed]})
          
    }
}