const Discord = require("discord.js")
const fs =  require("fs")
const timestamp = require('unix-timestamp');
module.exports = {
  name: 'conversion',
    async execute(message) {
        if(message.content.includes("https://")) return
  if(message.author.bot) return
  const index = message.content.split(/[0-9]/);
  var afterNumber = new String(index[1])
  var timeInt = message.content.replace( /[^\d.]/g, '' )
  var hours = timeInt.substring(0, 1)
  var minutes = 0
  if(afterNumber == ":") {
    var hours = timeInt.substring(0, 1)
    var minutes = timeInt.substring(1, 3)
    var afterNumber = new String(index[3])
  }
  if(afterNumber == "") {
    var hours = timeInt.substring(0, 1 + 1, 2)
    var afterNumber = new String(index[2])
    if(afterNumber == ":") {
      var afterNumber = new String(index[4])
      var minutes = timeInt.substring(2, 4)
    }
  }  

  if(afterNumber.includes("am") || afterNumber.includes("pm")) {
  if(!timeInt) return console.log("no time")
    var time = new Date()
    time.setHours(hours)
    time.setMinutes(minutes)
    var suffix = time.getHours() >= 12 ? "PM":"AM";
    if(afterNumber.toLowerCase().includes("am")) {
      if(suffix != "AM") {
        var suffix = "AM"
      time.setHours(time.getHours() + 12)
      }
    }
    if(afterNumber.toLowerCase().includes("pm")) {
      if(suffix != "PM") {
        var suffix = "PM"
      time.setHours(time.getHours() + 12)
      }
    }
    var utcTime = time.toUTCString()
    var unix = timestamp.fromDate(utcTime)
    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('hammertime')
					.setLabel('What is HammerTime?')
					.setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('delete')
        .setLabel("Accidental? Delete Me!")
        .setStyle("DANGER")
			);
      message.reply({
        content: `Converted to Hammertime\n<t:${unix}>`,
        components: [row],
        allowedMentions: ''
      })
  }
}
}
