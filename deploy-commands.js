const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const { Routes } = require('discord-api-types/v10');
const { clientId, testServerId, RoseGardenId, token, GoonServer } = require('./configFiles/config.json');
const commands = []
const commandsPath = './commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = (`${commandsPath}/${file}`);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}
const contextMenus = []
const contextPath = './contextMenus'
const contextFiles = fs.readdirSync(contextPath).filter(file => file.endsWith('.js'));

for (var file of contextFiles) {
	var filePath = (`${contextPath}/${file}`);
	var contextMenu = require(filePath);
  contextMenus.push(contextMenu.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);
const pushCommands = commands.concat(contextMenus)
rest.put(
	Routes.applicationGuildCommands(clientId, testServerId), { body: pushCommands })
	.then(() => console.log('Successfully registered application to Testing.'))
	.catch(console.error);
	rest.put(Routes.applicationGuildCommands(clientId, RoseGardenId), { body: pushCommands })
	.then(() => console.log('Successfully registered application to The Rose Garden.'))
	.catch(console.error);
	rest.put(
		Routes.applicationGuildCommands(clientId, GoonServer), { body: pushCommands })
		.then(() => console.log('Successfully registered application to Testing.'))
		.catch(console.error);