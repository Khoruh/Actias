const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get the avatar of the given user")
    .addUserOption(user =>
        user.setName("user")
        .setDescription("The User to get the avatar of.")
        .setRequired(true))
        .addStringOption(isEphemeral =>
            isEphemeral.setName("ephemeral")
            .setDescription("Chooses if you want the reply to be visible to other users")
            .setChoices(
                { name: "true", value: "true"},
                { name: "false", value: "false"}
            )),
    async execute(interaction) {
        var ephemeralOption = interaction.options.getString("ephemeral")
        if(ephemeralOption === "true") {
            var isEphemeral = true
        }
        else if(ephemeralOption === "false") {
            var isEphemeral = false
        }
            var userOption = interaction.options.getUser("user")
            var guildMember = interaction.guild.members.cache.get(userOption.id)
            interaction.reply({
                content: guildMember.displayAvatarURL(),
                ephemeral: isEphemeral
            })
    
    }
}