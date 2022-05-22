const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const { Routes } = require('discord-api-types/v10');
const { clientId, testServerId, RoseGardenId, token } = require('./configFiles/config.json');

const commands = [];
const commandsPath = './commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = (`${commandsPath}/${file}`);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, testServerId), { body: commands })
	.then(() => console.log('Successfully registered application to Testing.'))
	.catch(console.error);
	rest.put(Routes.applicationGuildCommands(clientId, RoseGardenId), { body: commands })
	.then(() => console.log('Successfully registered application to The Rose Garden.'))
	.catch(console.error);