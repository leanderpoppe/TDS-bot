// Environment variables
require('dotenv').config();
const token = process.env.TOKEN;
// Config imports
const {prefix} = require('./config.json');
// Discord imports
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
// Other imports
const fs = require('fs'); // Node.js FileSystem

// Gather all command js files and ass them toe the client.commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        // set a new item in the Collection
        // with the key as the command name and the value as the exported module
        client.commands.set(command.name, command);
    }
}

client.login(token);

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('?[command]. I am a useless bot :(', {
        status: "online", //You can show online, idle....
        type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
    });
});

client.on('message', message => {
    if (message.mentions.has(client.user)) {
        message.reply('How DARE you ping the almighty bot D:<');
    }

    // Check if message starts with prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    // console.info(`Called command: ${commandName}`);
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
