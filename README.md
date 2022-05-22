# Actias
Welcome to the github repository for Actias...assuming i managed to set it up correctly.  
Theres not actually a whole lot to say here obviously, but ill throw random notes around if i think they are relevent.
# index.js
Contains the actual handling of recieveing interactions. (ex. commands, buttons, select/context menus etc.)  
If you want to make Actias just respond to a message throw it in here under a messageCreate event.
# deploy-commands.js
This pushes Slash commands to Discord, making them visible and "functional", at least on Discords end.  
***This has to be run every time a command in ./commands is edited.***
# config.json
Contains alot of the relevent stuff for actually making sure Slash commands actually get pushed to Discord.  
The only unused thing in there is "prefix", this is just leftover from v12, however if you want to make a command or response through messageCreate, preferably check that it starts with this.
# Commands folder
Contains the individual files for each command. Just a little nicer than if else right?
# Logs folder
Contains seperate files for moderation logging purposes in Discord. (ex. Deleted/edited messages, edited roles etc.)
