const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the specified amount of messages (max: 100)")
    .addStringOption(string => 
        string.setName("amount")
        .setDescription("The amount of messages to delete")
        .setRequired(true)),
    async execute(interaction) {
        var amount = interaction.options.getString("amount")
        const permissionsEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "You are missing required permissions for this command.",
            fields: [
            { name: `Missing Permissions:`, value: '```diff\n-MANAGE_MESSAGES\n```'},
          ],
            timestamp: new Date(),
        })
        const deletedEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: `Deleted ${amount} Messages.`,
            timestamp: new Date(),
        })
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
            embeds: [permissionsEmbed]
        })
        interaction.channel.bulkDelete(amount).then(() => {
            interaction.reply({
                embeds: [deletedEmbed]
            }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 10000)
            })
        })
    }
    
    }