module.exports = {
    name: 'rr',
    description: 'Lets you play russian roulette',
    execute(msg, args) {
        const number = Math.random();
        if (number <= 0.17) {
            msg.channel.send(`BANG! ${msg.author} has died :(`);
        } else {
            msg.channel.send(`CLICK! ${msg.author} still lives :)`);
        }
    },
};
