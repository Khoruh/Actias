const fs = require('fs');
const path = require('node:path');
const Discord = require('discord.js');
const config = require('C:/Actias/configFiles/config.json');
const client = new Discord.Client({
  intents: new Discord.Intents(32767)
});
client.commands = new Discord.Collection();
const commandsPath = './commands'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = (`${commandsPath}/${file}`);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
//Wait For Ready
client.on('ready', () => {
  
    console.log(`${client.user.username} is ready to go!`);
});
client.on("interactionCreate", async interaction => {
//Selct Menu Handling
  if(interaction.isSelectMenu()) {

}
//Modal Handling 
 else if(interaction.isModalSubmit()) {
   //Echo Modal
   if(interaction.customId === "echoModal") {
     var echoMessage = interaction.fields.getTextInputValue("echoInput")
     interaction.reply({
       content: "Echoing Message...",
       ephemeral: true
     }).then(() => { 
       interaction.channel.send(echoMessage)
     })

   }

}
//Button Handling
 else if(interaction.isButton()) {
  
}
//Context Menu Handling
 else if(interaction.isContextMenu()) {

}
//User Context Menu Handling
 else if(interaction.isUserContextMenu()) {

}
//Slash Command Handling
 else if(interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  };
})
//Wait For Command Input.

client.login(config.token);