const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("blazing8")
    .setDescription("Start a game of Blazing 8's"),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to start a game of Blazing 8s."
        })
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'ocho').then(async invite => {
              return interaction.channel.send(`${invite.code}`);
              });
            }
    
    }