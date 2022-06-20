const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("See song queue")
    .addIntegerOption(page => 
        page.setName("page")
        .setDescription("The page of queue to see")
    ),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.sendFollowUp({ content: '❌ | No music is being played!' });
        if (!interaction.options.page) interaction.options.page = 1;
        const pageStart = 10 * (interaction.options.page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void interaction.editReply({
            embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]
        });

    }
};
