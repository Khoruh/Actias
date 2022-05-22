const fs = require('fs');
const path = require('node:path');
const Discord = require('discord.js');
const config = require('C:/Actias/configFiles/config.json');
const client = new Discord.Client({
  intents: new Discord.Intents(32767)
});
//Command stuff, gonna be honest, hardly know how this works.
client.commands = new Discord.Collection();
const commandsPath = './commands'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (var file of commandFiles) {
	var filePath = (`${commandsPath}/${file}`);
	var command = require(filePath);
	client.commands.set(command.data.name, command);
}
client.logs = new Discord.Collection();
const logsPath = './logs'
const logFiles = fs.readdirSync(logsPath).filter(file => file.endsWith('.js'))
for (var file of logFiles) {
  var filePath = (`${logsPath}/${file}`)
  var log = require(filePath)
}
//Wait For Ready
client.on('ready', () => {
  
    console.log(`${client.user.username} is ready to go!`);
});
client.on("interactionCreate", async interaction => {
//Select Menu Handling
  if(interaction.isSelectMenu()) {

}
//Modal Handling 
 else if(interaction.isModalSubmit()) {
   //Echo Modal
   if(interaction.customId === "echoModal") {
     //Get Modal Input
     var echoMessage = interaction.fields.getTextInputValue("echoInput")
     //Replying Here Makes The Modal Close Itself Without Throwing An Error.
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
    var command = client.commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  };
})
//Moderation Logs
client.on("messageDelete", async message => {
 try {
   await log.execute(message)
 } catch (error) {
   console.log(error)
 }
})

client.login(config.token);