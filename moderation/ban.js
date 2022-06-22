const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const fs = require("fs")
module.exports = {
	data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member with an optional reason")
    .addUserOption(userOption => 
        userOption.setName('member')
        .setDescription("The member to ban")
        .setRequired(true),
        )
    .addStringOption(kReason =>
        kReason.setName("reason")
        .setDescription("The reason for banning this member")
        ),
        async execute(interaction) {
            try {
                const permissionsEmbed = new Discord.MessageEmbed({
                    color: 3447003,
                    title: "You are missing required permissions for this command.",
                    fields: [
                    { name: `Missing Permissions:`, value: '```diff\n-BAN_MEMBERS\n```'},
                  ],
                    timestamp: new Date(),
                })
            var banUser = interaction.options.getUser("member")
            if(banUser.kickable === false) return interaction.reply({
                content: "User can not be banned.",
                ephemeral: true
            })
            var banMember = interaction.guild.members.cache.get(banUser.id)
            var banReason = interaction.options.getString("reason")
            if(!banReason) {
                var banReason = "No Reason Given"
            }
            var usedBy = interaction.member
            if(!usedBy.permissions.has("ban_MEMBERS")) return interaction.reply({
                embeds: [permissionsEmbed]
            })
            banMember.ban().then(() => {
                interaction.reply({
                    content: `${banMember.user.username} has been banned and a log has been created.`,
                    ephemeral: true
                })
                var guildConfig = (`./guildConfig/${interaction.guild.id}/settings.json`)
                readFile = fs.readFileSync(guildConfig)
                parsedFile = JSON.parse(readFile)
                var channelID = parsedFile.logChannel
                var modlog = interaction.guild.channels.cache.get(channelID)
                const banEmbed = new Discord.MessageEmbed({
                    color: 3447003,
                    title: "A Member Has Been Banned",
                    fields: [
                    { name: `Banned Member`, value: `${banMember.user.tag}`},
                    { name: `Reason` , value: `${banReason}`},
                    { name: `Moderator`, value: `${usedBy}`}
                  ],
                    timestamp: new Date(),
                })
                if(!modlog || modlog === undefined) return
                modlog.send({
                    embeds: [banEmbed]
                })

            })


        } catch (err) {
            console.log(err)
        }
 }
}