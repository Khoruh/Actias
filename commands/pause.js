const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the currently playing song"),
    async execute(interaction) {
        try {
        const pauseEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: `Pausing...`,
            timestamp: new Date(),
        })
        const queue = player.getQueue(interaction.guild)
        queue.setPaused(true)
        interaction.reply({
            embeds: [pauseEmbed]
        })

    } catch (err) {
        console.log(err)
    }
    }
}