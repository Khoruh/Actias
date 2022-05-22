const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		console.log("test")
		await interaction.reply('Pong!');
	},
};