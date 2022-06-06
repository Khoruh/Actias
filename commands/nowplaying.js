const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("now-playing")
    .setDescription("See the currently playing song"),
    async execute(interaction) {
        try {
        const queue = player.getQueue(interaction.guild)
        if(!queue || !queue.playing) return interaction.reply({
            content: "No music is currently being played."
        })
        const progress = queue.createProgressBar()
        const song = queue.current.title
        const perc = queue.getPlayerTimestamp()
        const npEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: `Now Playing`,
            description: `**${queue.current.title}** (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
            timestamp: new Date(),
        })
        interaction.reply({
            embeds: [npEmbed]
        })
    } catch (err) {
		console.log(err)
	}
 }
}