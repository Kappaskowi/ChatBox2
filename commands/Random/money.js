const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
var helper = require("test.js");
var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);

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
        var db_result = "";
        var db_query = "SELECT public.createBank(" + "'" + message.author.id + "')";
        pgClient.connect(function (err) {
            console.log("Connected!");
            pgClient.query(db_query, function (err, result) {
                if (err) {
                    console.log(err);
                    pgClient.end();
                }
                else if (result.rows) {
                    console.log(result.rows);
                    db_result = JSON.stringify(result.rows, null, "    ");
                    var userDataMoney = JSON.parse(db_result);
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
                                }
                            ]
                        }
                    }
                    );

                }
            })
            pgClient.end();
        });
    }
}

module.exports = MoneyCommand;
