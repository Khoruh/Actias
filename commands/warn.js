const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    //Create Slash command
    data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a member for given reason')
        .addUserOption(userOption => 
            userOption.setName('member')
            .setDescription("The member to warn")
            .setRequired(true),
            ),
             async execute(interaction) {
                 try {
                    if(!interaction.member.permissions.has("KICK_MEMBERS")) {
                        return interaction.channel.send({
                            embeds: []
                        })
                    }
                 //if(!interaction.member.permissions.has("KICK_USER")) return
                //Get selected user
                 warnedUser = interaction.options.getUser("member")
                 //Get user Id, mainly for creation of warns file
                 warnedUserID = warnedUser.id
                 //Get GuildMember from user object
                 warnedMember = interaction.guild.members.cache.get(warnedUserID)
                 //Get Guild Id for folder creation
                 guildID = interaction.guild.id
                 //Create Modal
		const warnModal = new Discord.Modal()
		.setCustomId('warn')
		.setTitle("Why are you warning this member?")
		//Create Input Field
		const warnReason = new Discord.TextInputComponent()
		.setCustomId("wReason")
		.setLabel("Reason")
		.setStyle("PARAGRAPH")
		//Add Input To Action Row
		const warnInput = new Discord.MessageActionRow().addComponents(warnReason)
		//Add Action Row To Modal
		warnModal.addComponents(warnInput)
        //Wait for Modal
		await interaction.showModal(warnModal)
        //Wait for this Interaction Client Modal Submit
        interaction.client.on("interactionCreate", interaction => {
            if(interaction.isModalSubmit()) {
                //Get Modal input for warn reason
                var wReason = interaction.fields.getTextInputValue("wReason")
//Specific warns folder
var guildID = interaction.guild.id
var guildFolder = `./guildConfig/${guildID}/`
//Check if it exists, if not, create it
if(fs.existsSync(guildFolder) === false) {
    fs.mkdirSync(guildFolder, {
		recursive: true
	});
}
var warnsFolder = `${guildFolder}/userWarns`
//Check if it exists, if not, create it
if(fs.existsSync(warnsFolder) === false) {
    fs.mkdirSync(warnsFolder, {
		recursive: true
	});
}
//Get Guild specific file for Member
 const warnsFile = `${warnsFolder}/${warnedUserID}.json`
 //Check if it exists, if not, create it aswell
if(fs.existsSync(warnsFile) === false) {
        const warnCreate = {
            "one": "null",
            "two": "null",
            "three": "null"
        }
        const warnContent = JSON.stringify(warnCreate)
        fs.writeFileSync(warnsFile, warnContent)
    }
        readFile = fs.readFileSync(warnsFile)
        parsedFile = JSON.parse(readFile)
        //If reason one is null, apply reason to it
if(parsedFile.one === "null") {
    parsedFile.one = `${wReason}`
    fs.writeFile(`${warnsFile}`, JSON.stringify(parsedFile), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(parsedFile));
        console.log('writing to ' + warnsFile);
      });
      warnedUser.send({
          content: `You have been given your first warning for ${wReason}`
      })
}
//If reason one is not null, make it warn 2
else if(parsedFile.one !== "null") {
    parsedFile.two = `${wReason}`
    fs.writeFile(`${warnsFile}`, JSON.stringify(parsedFile), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(parsedFile));
        console.log('writing to ' + warnsFile);
      });
      warnedUser.send({
        content: `You have been given your second warning for ${wReason}`
    })
}
//If both are not null, make warn 3
else if(parsedFile.one !== "null" | parsedFile.two !== "null") {
    parsedFile.three = `${wReason}`
    fs.writeFile(`${warnsFile}`, JSON.stringify(parsedFile), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(parsedFile));
        console.log('writing to ' + warnsFile);
      });
      warnedUser.send({
        content: `You have been given your third warning for ${wReason}\n Any following warnings will result in a kick from the server.`
    })
      //If all are not null, kick user
  } else if(parsedFile.one !== "null" | parsedFile.two !== "null" | parsedFile.three !== "null") {
      warnedMember.kick().then(() => {
          interaction.reply({
              content: `Member ${warnedUser.user.userame} has been kicked due to reaching their fourth warning.`,
              ephemeral: true
          })
          warnedUser.send({
              content: `You have been kicked from ${interaction.guild.name} for getting warned too many times.`
          })
          //Send modlog after writing all that stuff
      })

  }
  interaction.reply({
      content: `Warned ${warnedMember.user.username} for ${wReason}`,
      ephemeral: true
  })

            }

        })

            } catch (err) {
                console.log(err)
            }
          }
        }