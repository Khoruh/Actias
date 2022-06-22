const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("chess")
    .setDescription("Start a game of Chess"),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to start a game of Chess."
        })
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
              return interaction.channel.send(`${invite.code}`);
              });
            }
    
    }