const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;
var client = new pg.Client(connectionString);
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

        client.connect();
        var query = client.query("SELECT * FROM bank");
        query.on("row", function (row, result) {
            result.addRow(row);
            console.log("Test1");
        });
        query.on("end", function (result) {
            console.log("Test2");
            console.log(JSON.stringify(result.rows, null, "    "));
            client.end();
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
