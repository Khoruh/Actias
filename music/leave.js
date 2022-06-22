const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Disconnect the bot from the channel"),
    async execute(interaction) {
        try {
        const queue = player.getQueue(interaction.guild)
        if(!queue) {
            return interaction.reply({
                content: "There is no music currently in queue."
            })
        }
        queue.destroy()
        interaction.reply(`Disconnecting from ${interaction.member.voice.channel}`)
    } catch (err) {
        console.log(err)
    }
    }
}