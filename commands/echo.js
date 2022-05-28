const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos the inputted message'),
	async execute(interaction) {
		//Create Echo Modal
		const echoModal = new Discord.Modal()
		.setCustomId('echo')
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
		interaction.client.on("interactionCreate", interaction => {
			if(interaction.isModalSubmit()) {
				var echoMessage = interaction.fields.getTextInputValue("echoInput")
				interaction.reply({
					content: `Echoing: ${echoMessage}`,
					ephemeral: true
				})
				interaction.channel.send({
					content: `${echoMessage}`,
				})
			}

		})
	},
};