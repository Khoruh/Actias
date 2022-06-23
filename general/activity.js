const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("activity")
    .setDescription("Start a Discord activity")
    .addStringOption(option =>
        option.setName("activity")
        .setDescription("The activity to start")
        .setChoices(
            { name: "poker", value: "poker"},
            { name: "watchalong", value: "watchalong"},
            { name: "chess", value: "chess"},
            { name: "blazing8s", value: "blazing8s"},
        )
        .setRequired(true)),
    async execute(interaction) {
        var option = interaction.options.getString("activity")
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please join a Voice channel to start an activity"
        })
        if(option === "poker") {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
              return interaction.reply(`${invite.code}`);
              });
        } else if (option === "watchalong") {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                return interaction.reply(`${invite.code}`);
                });
        } else if (option === "chess") {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
                return interaction.reply(`${invite.code}`);
                });
        } else if (option === "blazing8s") {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'ocho').then(async invite => {
                return interaction.reply(`${invite.code}`);
                });
        }
        }
    
    }