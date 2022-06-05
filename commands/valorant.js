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
    ),
    async execute(interaction) {
      var option = interaction.options.getSubcommand()
      var userID = interaction.user.id
      var valFolder = ("./valorantUsers")
      var valUser = (`${valFolder}/${userID}.json`)
      if(option === "username") {
        if(fs.existsSync(valFolder) === false) {
          fs.mkdirSync(valFolder, {
          recursive: true
        });
      }
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
      var valName = interaction.options.getString("name")
      var valTag = interaction.options.getString("tag")
      readFile = fs.readFileSync(valFile)
        parsedFile = JSON.parse(readFile)
        parsedFile.username = valName
        parsedFile.tag = valTag
        fs.writeFile(valFile, JSON.stringify(parsedFile), function writeJSON(err) {
          if (err) return console.log(err);
          console.log(JSON.stringify(parsedFile));
          console.log('writing to ' + valFile);
        });
        interaction.reply({
          content: "Registered Username"
        })


      }
      else if(option === "stats") {
        const valFile = `${valFolder}/${userID}.json`
        readFile = fs.readFileSync(valFile)
        parsedFile = JSON.parse(readFile)
        if(!valFile) return interaction.reply({
          content: "Please user `/valorant username`"
        })

        try {

          const user = new StingerJS.default(`${parsedFile.username}`, `${parsedFile.tag}`);
          interaction.deferReply()
          var stats = ((await user.ranked()).stats)
          var userStats = ((await user.info()))
          const valStatsEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "General VALORANT Stats",
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
          ],
            timestamp: new Date(),
        })
        const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('valSelect')
					.setPlaceholder('More Stat Options')
					.addOptions([
						{
							label: 'Attack',
							description: 'Get stats for Attack side',
							value: 'attack',
						},
						{
							label: 'Defence',
							description: 'Get stats for Defense side',
							value: 'defense',
						},
            {
              label: 'General',
              description: 'General VALORANT Stats.',
              value: 'general'
            }
					]),
			);
            interaction.editReply({
              embeds: [valStatsEmbed],
              components: [row]
            })
        } catch (err) {
          console.log(err)
          /* Error: We could not find the player [player]. */
        }
      }
      interaction.client.on("interactionCreate", interaction => {
        if(!interaction.isSelectMenu()) return;
        if(interaction.customId === "valSelect") {
          if(interaction.values.toString() === "attack") {
            const valAttackEmbed = new Discord.MessageEmbed({
              color: 3447003,
              title: "Attack Side VALORANT Stats",
              fields: [
              { name: `Attack KD`, value: `${stats.kDRatio}`, inline: true},
              { name: `Attack Win Percentage` , value: `${stats.attackRoundsWinPct}`, inline: true},
            ],
              timestamp: new Date(),
          })
          interaction.update({
            embeds: [valAttackEmbed]
          })

          } else if(interaction.values.toString() === "defense") {
            const valDefenseEmbed = new Discord.MessageEmbed({
              color: 3447003,
              title: "Attack Side VALORANT Stats",
              fields: [
              { name: `Defense KD`, value: `${stats.defenseKDRatio}`, inline: true},
              { name: `Defense Win Percentage` , value: `${stats.defenseRoundsWinPct}`, inline: true},
            ],
              timestamp: new Date(),
          })
          interaction.update({
            embeds: [valDefenseEmbed]
          })
        } else if(interaction.values.toString() === "general") {
          const valStatsEmbed = new Discord.MessageEmbed({
            color: 3447003,
            title: "General VALORANT Stats",
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
          ],
            timestamp: new Date(),
        })
        interaction.update({
          embeds: [valStatsEmbed]
        })

        }
      }
      })
    }
        }