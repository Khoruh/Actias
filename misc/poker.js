const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("poker")
    .setDescription("Start a game of Poker"),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to start a game of Poker."
        })
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
              return interaction.reply(`${invite.code}`);
              });
            }
    
    }