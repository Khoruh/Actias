const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("updates")
    .setDescription(`Shows update/"patch" notes of Actias`),
    async execute(interaction) {
        return
        const v045 = new Discord.MessageEmbed({
            color: 3447003,
            title: `Patch 0.4.5`,
            timestamp: new Date(),
        })
        
            
            }
    
    }