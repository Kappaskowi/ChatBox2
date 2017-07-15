const commando = require('discord.js-commando');
const fs = require("fs");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;

class RobbingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rob',
            group: 'random',
            memberName: 'rob',
            description: 'Hit a lick'
        });
    }
    async run(message, args) {
        var robbedAmmount = Math.floor(Math.random() * 1000) + 1;
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("UPDATE public.bank SET cash = cash + " + robbedAmmount + " WHERE userid = " + message.author.id);
        message.reply("You robbed $" + robbedAmmount);
        client.end();
    }
}

module.exports = RobbingCommand;
