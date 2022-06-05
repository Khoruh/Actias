const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("watchalong")
    .setDescription("Start a youtube Watch-Along."),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to start a Watch-Along."
        })
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
              return interaction.channel.send(`${invite.code}`);
              });
            }
    
    }