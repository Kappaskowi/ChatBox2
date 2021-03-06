const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;

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
        function InsertEmbed(_rows) {
            var userDataMoney = JSON.parse(JSON.stringify(_rows, null, "    "));
            console.log(userDataMoney);
            message.channel.send({
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
                }
            });
        };

        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("SELECT cash, bankamount FROM public.bank WHERE userid = " + message.author.id);
        query.on("row", function (row, result) {
            result.addRow(row);
            console.log("Test1");
        });
        query.on("end", function (result) {
            console.log("Test2");
            if (result.rows.length > 0) {
                InsertEmbed(result.rows);
                client.end();
            }
            else {
                 message.reply("You don't have a bank account yet. Creating bank account...");
                 query = client.query("INSERT INTO public.bank(userid, cash, bankamount) VALUES ('" + message.author.id + "',0,0)");
                 client.end();
            }

            
        });

    };
}
module.exports = MoneyCommand;
