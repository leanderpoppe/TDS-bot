module.exports = {
    name: 'yesorno',
    description: 'Tells you to do or do not do a thing',
    execute(msg, args) {
        const number = Math.random();
        if (number < 0.5) {
            msg.channel.send('Yes! :D');
        } else {
            msg.channel.send('No! D:');
        }
    },
};
