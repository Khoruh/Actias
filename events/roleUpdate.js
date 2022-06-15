const Discord = require("discord.js")
const fs =  require("fs")
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
  });
module.exports = {
    //This one is gonna be a little jank because changing its position in the hierarchy counts as an update...which means it emits
    //every single time any role gets moved...soooo, slight compromise to work around that
  name: 'roleUpdate',
    async execute(oldRole, newRole) {
      return
        //Get Channel For Logging, replace with config file at later date?    
        var guildConfig = (`./guildConfig/${oldRole.guild.id}/settings.json`)
        if(!guildConfig) return
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = oldRole.guild.channels.cache.get(channelID)
                //This is to prevent every server role from sending an update if a new role is created or any one role is moved
                //Unforunately this means a role update log will not be sent if only role hierarchy is changed
                //or if anything else is changed with the hoist while the name remains the same
        if(oldRole.hoist !== newRole.hoist && oldRole.name === newRole.name) {
            return
        }
        else if(oldRole.hoist === newRole.hoist) {

        }
        const roleEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "A Message Was Edited",
            fields: [
            { name: `Message Author`, value: `${oldMessage.author}`},
            { name: `Old Message`, value: `${oldMessage.content}`},
            { name: `New Message`, value: `${newMessage.content}`},
          ],
            timestamp: new Date(),
            })
            //Send Embed
            if(!modlog) return
            modlog.send({embeds: [editEmbed]})
          
    }
}