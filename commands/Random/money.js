const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('./lib/db');

class MoneyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'money',
            group: 'random',
            memberName: 'money',
            description: 'Balance'
        });
    };

    async run(message, args) {
        var client = new pg.Client();

        // connect to our database
        client.connect(function (err) {
            if (err) throw err;

            // execute a query on our database
            client.query('SELECT $1::text as name', ['brianc'], function (err, result) {
                if (err) throw err;

                // just print the result to the console
                console.log(result.rows[0]); // outputs: { name: 'brianc' }

                // disconnect the client
                client.end(function (err) {
                    if (err) throw err;
                });
            });
        });

    };
}

module.exports = MoneyCommand;
//var db_query = "SELECT public.createBank(" + "'" + message.author.id + "')";
/*message.channel.send({
    "embed": {
        "description": "**Discord Bank**",
        "color": 12367392,
        "timestamp": new Date(),
        "footer": {
            "text": "Discord Bank"
        },
        "fields": [
            {
                "name": "Cash",
                "value": "$ " + userDataMoney[0].cash,
                "inline": true
            },
            {
                "name": "Bank",
                "value": "$ " + userDataMoney[0].bankamount,
                "inline": true
            }]
    }*/