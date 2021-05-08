// Config imports
const {token, prefix} = require('./config.json');
// Discord imports
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
// Other imports
const fs = require('fs'); // Node.js FileSystem

// Gather all command js files and ass them toe the client.commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.login(token);

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "I am a useless bot :(",  //The message shown
            type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
