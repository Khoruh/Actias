const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member with an optional reason")
    .addUserOption(userOption => 
        userOption.setName('member')
        .setDescription("The member to kick")
        .setRequired(true),
        )
    .addStringOption(kReason =>
        kReason.setName("reason")
        .setDescription("The reason for kicking this member")
        ),
        async execute(interaction) {
            try {
                const permissionsEmbed = new Discord.MessageEmbed({
                    color: 3447003,
                    title: "You are missing required permissions for this command.",
                    fields: [
                    { name: `Missing Permissions:`, value: '```diff\n-KICK_MEMBERS\n```'},
                  ],
                    timestamp: new Date(),
                })
            console.log(modlog.name)
            var kickUser = interaction.options.getUser("member")
            var kickMember = interaction.guild.members.cache.get(kickUser.id)
            var kickReason = interaction.options.getString("reason")
            if(!kickReason) {
                var kickReason = "No Reason Given"
            }
            var usedBy = interaction.member
            if(!usedBy.permissions.has("KICK_MEMBERS")) return interaction.reply({
                embeds: [permissionsEmbed]
            })
            kickMember.kick().then(() => {
                interaction.reply({
                    content: `${kickMember.user.username} has been kicked and a log has been created.`,
                    ephemeral: true
                })
                var guildConfig = (`./guildConfig/${interaction.guild.id}/settings.json`)
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = interaction.guild.channels.cache.get(channelID)
                const kickEmbed = new Discord.MessageEmbed({
                    color: 3447003,
                    title: "A Member Has Been Kicked",
                    fields: [
                    { name: `Kicked Member`, value: `${kickMember.user.tag}`},
                    { name: `Reason` , value: `${kickReason}`},
                    { name: `Moderator`, value: `${usedBy}`}
                  ],
                    timestamp: new Date(),
                })
                modlog.send({
                    embeds: [kickEmbed]
                })

            })


        } catch (err) {
            console.log(err)
        }
 }
}