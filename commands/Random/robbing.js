const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
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
        console.log("Connected to Mysql");
       client.query('UPDATE public.bank SET cash = 100 WHERE userid = 304369797930418181', function(err,result) {
         if (err) {
            console.error(err);
            } 
           else
            console.log(result);
            message.reply("You robbed $" + robbedAmmount);
       });
        Console.log("end");
        client.end();
    }
}

module.exports = RobbingCommand;
