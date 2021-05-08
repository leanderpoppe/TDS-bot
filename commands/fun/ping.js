module.exports = {
    name: 'ping',
    description: 'Returns pong :3',
    execute(msg, args) {
        // msg.reply('pong');
        msg.channel.send('pong');
    },
};
