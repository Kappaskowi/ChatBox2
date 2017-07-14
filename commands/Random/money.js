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
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            console.log("Connected");
            //use the client for executing the query
            client.query('SELECT cash AS Bank', ['1'], function (err, result) {
                //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                done(err);

                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result.rows[0].cash);
                //output: 1
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