const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require("discord-player");
const queue = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption(query => 
        query.setName("query")
        .setDescription("The song to search for")
    ),
    async execute(interaction) {
        try {
        const query = interaction.options.getString('query')
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        })
        if(queue.setPaused === true) {
            queue.play()
        } else {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to play a song."
        })
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) { 
         return interaction.reply({ content: "You are not in my voice channel", ephemeral: true });
        }
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel", ephemeral: true });
        }
        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `Track **${query}** not found` });
        if(track.playlist !== undefined) {
            queue.addTracks(track.playlist.tracks)
            queue.play();
        } else {
            queue.play(track)
        }

        

         await interaction.followUp({ content: `Loading track **${track.title}**` });

    }
              } catch (err) {
                console.log(err)
        }
        }
    }
    