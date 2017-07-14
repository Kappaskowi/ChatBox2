const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');

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
        pool.query('SELECT $1::int AS number', ['2'], function (err, res) {
            if (err) {
                return console.error('error running query', err);
            }

            console.log('number:', res.rows[0].number);
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