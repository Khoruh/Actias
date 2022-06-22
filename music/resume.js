const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume playing queue"),
    
    async execute(interaction) {
        try {
            const resumeEmbed = new Discord.MessageEmbed({
                color: 3447003,
                title: `Resuming...`,
                timestamp: new Date(),
            })
            const queue = player.getQueue(interaction.guild)
            if(!queue) {
                return interaction.reply({
                    content: "There is no music currently in queue."
                })
            }
            queue.setPaused(false)
            interaction.reply({
                embeds: [resumeEmbed]
            })
    
        } catch (err) {
            console.log(err)
        }
    }
}