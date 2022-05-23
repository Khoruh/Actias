const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {
     data: new ContextMenuCommandBuilder()
	.setName('Bookmark')
	.setType(3),
    async execute(interaction) {
     var messageId = interaction.targetId
     var message = interaction.channel.messages.cache.get(`${messageId}`)
     var messageAuthor = message.author.username
     var bookmarkUser = interaction.user
     const bookmarkEmbed = new Discord.MessageEmbed({
        color: 3447003,
        title: "Bookmarked Message",
        fields: [
        { name: `Message`, value: `${message.content}`},
        { name: `Message Author`, value: `${messageAuthor}`},
        { name: `Message Link`, value: `${message.url}`}
      ],
        timestamp: new Date(),
        })
        interaction.reply({
            content: "Bookmarking message",
            ephemeral: true,
        })
        bookmarkUser.send({embeds: [bookmarkEmbed]})

    }
}