const commando = require('discord.js-commando');

class CreateCommand extends  commando.Command  {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['copycat', 'repeat', 'echo', 'parrot'],
            group: 'random',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });    
    }

    hasPermission(msg) {
        return msg.member.hasPermission('BAN_MEMBERS');
    }

    run(msg, args) {
        if (msg.channel.type !== 'dm')
            if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES')) 
                return msg.say('Error! I don\'t have permission to Manage Messages!');
        const { text } = args;
        msg.delete();
        return msg.say(`\u180E${text}`);
    }
};
module.exports = CreateCommand;