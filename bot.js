const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const logger = require('./tools/logger.js');
const tools = require('./tools/tools.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

    // bot works on mentions
    if (message.isMentioned(client.user) && !message.author.bot) {

        // remove mention and get args separated by ':'
        let args = message.content.substr(message.content.indexOf(' ') + 1);
        args = args.split(':').map(elem => elem.trim());

        let command = args[0];

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
});

client.login(config.token);