const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos the inputted message'),
	async execute(interaction) {
		//Create Echo Modal
		const echoModal = new Discord.Modal()
		.setCustomId('echoModal')
		.setTitle("What do you want to echo?")
		//Create Input Field
		const echoMessage = new Discord.TextInputComponent()
		.setCustomId("echoInput")
		.setLabel("Message")
		.setStyle("PARAGRAPH")
		//Add Input To Action Row
		const echoInput = new Discord.MessageActionRow().addComponents(echoMessage)
		//Add Action Row To Modal
		echoModal.addComponents(echoInput)
		await interaction.showModal(echoModal)
	},
};