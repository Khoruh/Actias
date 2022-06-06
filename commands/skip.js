const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs")
const Discord = require("discord.js")
const { Player } = require("discord-player");
module.exports = {
    //Create Slash command
    data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),
        async execute(interaction) {
            try {
            const skipEmbed = new Discord.MessageEmbed({
                color: 3447003,
                title: `Skipping...`,
                timestamp: new Date(),
            })
            const queue = player.getQueue(interaction.guild)
            queue.skip()
            interaction.reply({
                embeds: [skipEmbed]
            })

        } catch (err) {
            console.log(err)
        }
 }
}