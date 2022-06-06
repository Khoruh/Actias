const { SlashCommandBuilder, ComponentAssertions } = require('@discordjs/builders');
const Discord = require("discord.js")
const fs = require("fs")
const prettyMS = require('pretty-ms');
const StingerJS = require('stinger.js');
module.exports = {
    //Create Slash command
    data: new SlashCommandBuilder()
		.setName('valorant')
		.setDescription('VALORANT related commands')
    .addSubcommand(username =>
      username.setName("username")
      .setDescription("Set-up your VALORANT username for stats.")
      .addStringOption(name =>
        name.setName("name")
        .setDescription("You VALORANT username")
        .setRequired(true))
        .addStringOption(tag =>
          tag.setName("tag")
          .setDescription("Your VALORANT tag, excluding the #")
          .setRequired(true))
    )
    .addSubcommand(stats => 
      stats.setName("stats")
      .setDescription("Get your VALORANT stats")
      .addUserOption(userOption =>
        userOption.setName("user")
        .setDescription("Optional Selection of a different player"))
      .addStringOption(valName => 
        valName.setName("name")
        .setDescription("Name of user to search"))
      .addStringOption(valTag => 
        valTag.setName("tag")
        .setDescription("The tag of the user to search, excluding the #"))
    ),
    async execute(interaction) {
      //Get sub-command
      var option = interaction.options.getSubcommand()
      //Get ID of user that ran the command
      var userID = interaction.user.id
      //Specify where valorant users are
      var valFolder = ("./valorantUsers")
      if(option === "username") {
        //Check if folder exists, technically not needed since its global, but its safe.
        if(fs.existsSync(valFolder) === false) {
          fs.mkdirSync(valFolder, {
          recursive: true
        });
      }
      //Get user specific file
      const valFile = `${valFolder}/${userID}.json`
 //Check if it exists, if not, create it aswell
if(fs.existsSync(valFile) === false) {
        const valCreate = {
            "username": "null",
            "tag": "null",
        }
        const valContent = JSON.stringify(valCreate)
        fs.writeFileSync(valFile, valContent)
    }
    //Get "name" option
      var valName = interaction.options.getString("name")
    //Get "tag" option
      var valTag = interaction.options.getString("tag")
      //Read and parse file
      readFile = fs.readFileSync(valFile)
        parsedFile = JSON.parse(readFile)
        //Set name and tag in json
        parsedFile.username = valName
        parsedFile.tag = valTag
        //Write to file
        fs.writeFile(valFile, JSON.stringify(parsedFile), function writeJSON(err) {
          if (err) return console.log(err);
          console.log(JSON.stringify(parsedFile));
          console.log('writing to ' + valFile);
        });
        //Reply
        interaction.reply({
          content: "Registered Username",
          ephemeral: true
        })


      }
      else if(option === "stats") {
        //Get command option "name" if used
        var userGet = interaction.options.getString("name")
        //Get command option "tag" if used
        var tagGet = interaction.options.getString("tag")
        //Get command option "user" if used
        var valOption = interaction.options.getUser("user")
        //Check if user option was given
        //If there was, get file of supplied user
        if(valOption !== null) {
        var valFile = `${valFolder}/${valOption.id}.json`
        //Check if it exists
        if(!fs.existsSync(valFile)) return interaction.reply({
          content: "This user has not connected their VALORANT account."
        })
        //Read and parse
        var readFile = fs.readFileSync(valFile)
        var parsedFile = JSON.parse(readFile)
        //If not, get file of command user
      } else if(valOption === null) {
        var valFile = `${valFolder}/${userID}.json`
        //Check if it exists
        if(!fs.existsSync(valFile)) return interaction.reply({
          content: "Please use `/valorant username`"
        })
        //Read and parse
        var readFile = fs.readFileSync(valFile)
        var parsedFile = JSON.parse(readFile)

      }

       //Check if a username was given
       //If not, create a Stinger using users config file
       if(userGet === null) {
          var user = new StingerJS.default(`${parsedFile.username}`, `${parsedFile.tag}`);
          //If supplied, check if the tag was also supplied
       } else if(userGet !== null) {
         if(tagGet === null) {
           return interaction.reply({
             content: "Please enter a valid tag."
           })
         }
         //If both supplied, create Stinger using the values
        var user = new StingerJS.default(`${userGet}`, `${tagGet}`);

       }
       //Defer reply, without this, the bot will crash, as you only have 3 seconds to respond to an interaction
          await interaction.deferReply()
          try {
            //Get user ranked info, and general account info
          var stats = ((await user.ranked()).stats)
          var userStats = ((await user.info()))
          //Theres an easier way to do this which is specifiying different varibles for name and tag, but im lazy
          //so im just going construct the embed twice
          //If theres no supplied user, title uses command user
          if(userGet === null) {
          var valStatsEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: `General VALORANT Stats of ${parsedFile.username}#${parsedFile.tag}`,
            thumbnail: {
              url: `${userStats.rank.current.iconUrl}`

            },
            fields: [
            { name: `Current Rank`, value: `${userStats.rank.current.tierName}`, inline: true},
            { name: `Peak Rank`, value: `${userStats.rank.peak.tierName}`, inline: true},
            { name: `Playtime`, value: `${prettyMS(stats.timePlayed)}`, inline: true},
            { name: `Win Percentage` , value: `${stats.matchesWinPct}`, inline: true},
            { name: `Headshot Percentage`, value: `${Math.round(100*stats.headshotsPercentage)/100}`, inline: true},
            { name: `KDA`, value: `${Math.round(100*stats.kDARatio)/100}`, inline: true},
            { name: `Total Damage Dealt`, value: `${stats.damage}`, inline: true},
            { name: `Total Damage Reciveved`, value: `${stats.damageReceived}`, inline: true},
            { name: `Aces`, value: `${stats.aces}`, inline: true},
            { name: `Clutches`, value: `${stats.clutches}`, inline: true},
            { name: `Total Matches`, value: `${stats.matchesPlayed}`, inline: true},
            { name: `Most Kills In Match`, value: `${stats.mostKillsInMatch}`, inline: true},
            { name: `Defense KD`, value: `${stats.defenseKDRatio}`, inline: true},
            { name: `Defense Win Percentage` , value: `${stats.defenseRoundsWinPct}`, inline: true},
            { name: `Attack KD`, value: `${stats.kDRatio}`, inline: true},
            { name: `Attack Win Percentage` , value: `${stats.attackRoundsWinPct}`, inline: true},
          ],
            timestamp: new Date(),
        })
      }
      //If it is supplied, title uses those
      if(userGet !== null) {
        var valStatsEmbed = new Discord.MessageEmbed({
          color: 3447003,
          title: `General VALORANT Stats of ${userGet}#${tagGet}`,
          thumbnail: {
            url: `${userStats.rank.current.iconUrl}`

          },
          fields: [
          { name: `Current Rank`, value: `${userStats.rank.current.tierName}`, inline: true},
          { name: `Peak Rank`, value: `${userStats.rank.peak.tierName}`, inline: true},
          { name: `Playtime`, value: `${prettyMS(stats.timePlayed)}`, inline: true},
          { name: `Win Percentage` , value: `${stats.matchesWinPct}`, inline: true},
          { name: `Headshot Percentage`, value: `${Math.round(100*stats.headshotsPercentage)/100}`, inline: true},
          { name: `KDA`, value: `${Math.round(100*stats.kDARatio)/100}`, inline: true},
          { name: `Total Damage Dealt`, value: `${stats.damage}`, inline: true},
          { name: `Total Damage Reciveved`, value: `${stats.damageReceived}`, inline: true},
          { name: `Aces`, value: `${stats.aces}`, inline: true},
          { name: `Clutches`, value: `${stats.clutches}`, inline: true},
          { name: `Total Matches`, value: `${stats.matchesPlayed}`, inline: true},
          { name: `Most Kills In Match`, value: `${stats.mostKillsInMatch}`, inline: true},
          { name: `Defense KD`, value: `${stats.defenseKDRatio}`, inline: true},
          { name: `Defense Win Percentage` , value: `${stats.defenseRoundsWinPct}`, inline: true},
          { name: `Attack KD`, value: `${stats.kDRatio}`, inline: true},
          { name: `Attack Win Percentage` , value: `${stats.attackRoundsWinPct}`, inline: true},
        ],
          timestamp: new Date(),
      })
    }
    //Edit deferred reply with embed after information 
        await interaction.editReply({
          embeds: [valStatsEmbed]
        })
    } catch (err) {
      interaction.editReply("Invalid User.")

    }
  }
    }
  }
    