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
        query.on("row", function (row, result) {
            result.addRow(row);
            console.log("Test1");
        });
         query.on("end", function (result) {
            console.log("Test2");
            message.reply("You robbed $" + robbedAmmount);
         });
        client.end();
    }
}

module.exports = RobbingCommand;
