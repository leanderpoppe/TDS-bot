module.exports = {
    name: 'help',
    description: 'Displays help menu',
    execute(msg, args) {
        msg.channel.send(`
These are the available commands:

**?help** - Displays help menu
**?kill** *<@user>* - Kills a user :o
**?ping** - Returns with pong :3
**?rr** - Play russian roulette
**?yesorno** <question> - Answers your question with a yes or no
        `);
    },
};
