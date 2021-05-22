module.exports = {
    name: 'kill',
    description: 'Kills a person :o',
    execute(msg, args) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You have killed: ${taggedUser.username} >:)`);
        } else {
            msg.reply('This is not a user dumbass >:(');
        }
    },
};
