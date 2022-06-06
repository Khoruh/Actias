const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Change some settings about Actias")
    .addSubcommand(subcommand =>
        subcommand.setName("logs")
        .setDescription("Set a channel to send moderation logs to")
        .addChannelOption(channel =>
            channel.setName("channel")
            .setDescription("The channel to send logs to")
            .setRequired(true))
    ),
    async execute(interaction) {
        try {
            const permissionsEmbed = new Discord.MessageEmbed({
                color: 3447003,
                title: "You are missing required permissions for this command.",
                fields: [
                { name: `Missing Permissions:`, value: '```diff\n-MANAGE_SERVER\n```'},
              ],
                timestamp: new Date(),
            })
            if(!interaction.member.permissions.has("MANAGE_SERVER")) {
                return interaction.reply({
                    embeds: [permissionsEmbed]
                })
            }
            var commandOption =  interaction.options.getSubcommand()
            if(commandOption === "logs") {
                var channelOption = interaction.options.getChannel("channel")
                var guildFolder = (`./guildConfig/${interaction.guild.id}`)
                if(fs.existsSync(guildFolder) === false) {
                    fs.mkdirSync(guildFolder, {
                        recursive: true
                    });
                }
                var guildConfig = (`${guildFolder}/settings.json`)
                if(!fs.existsSync(guildConfig)) {
                    const settingsCreate = {
                        "logChannel": "null",
                        
                    }
                    const settingContent = JSON.stringify(settingsCreate)
                    fs.writeFileSync(guildConfig, settingContent)
                }
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                parsedFile.logChannel = channelOption.id
                fs.writeFile(`${guildConfig}`, JSON.stringify(parsedFile), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(parsedFile));
                    console.log('writing to ' + guildConfig);
                    interaction.reply({
                        content: `Logs channel has been set to ${channelOption}`,
                        ephemeral: true
                    })
                  });


            }

        } catch (err) {
            console.log(err)
        }
 
    }
}