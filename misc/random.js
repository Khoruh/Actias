const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const { DiscordTogether } = require('discord-together');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Generate random teams"),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({
            content: "Please be in a voice channel to generate teams from"
        })
        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
          }
          
        const teams = []
        var voiceChannel = interaction.member.voice.channel
        var voiceId = voiceChannel.id
        interaction.guild.members.cache.forEach(member => {
            var voiceMember = interaction.guild.members.cache.get(member.id)
            if(voiceMember.voice.channelId === voiceId) {
                if(voiceMember.nickname == null) {
                    teams.push(voiceMember.user.username)
                } else {
                teams.push(voiceMember.nickname)
                }

            }
        })
        shuffle(teams)
        var team1 = `${teams[0]}\n${teams[2]}\n${teams[4]}\n${teams[6]}\n${teams[8]}`
        var team2 = `${teams[1]}\n${teams[3]}\n${teams[5]}\n${teams[7]}\n${teams[9]}`
        if(!teams[1]) return interaction.reply({
            content: "There is less than 2 people in the call."
        })
        var team1Fin = team1.replace(/undefined/g, " ")
        var team2Fin = team2.replace(/undefined/g, " ")
        var valTeamsEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: `Randomly Generated Teams:`,
            fields: [
            { name: `Team 1:`, value: `${team1Fin}`, inline: true},
            { name: `Team 2:`, value: `${team2Fin}`, inline: true},
          ],
            timestamp: new Date(),
        })
        interaction.reply({
            embeds: [valTeamsEmbed]
        })
            }
    
    }