const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;
class GarageCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'garage',
            group: 'random',
            memberName: 'garage',
            description: 'garage'
        });
    }
    async run(message, args) {
        function InsertEmbed(_rows) {
            var userDataGarage = _rows;
            console.log(userDataGarage);
            message.channel.send({
                "embed": {
                    "description": message.author + " **Garage**",
                    "color": 12367392,
                    "thumbnail": {
              "url":  userDataGarage[0].img
            },
                    "timestamp": new Date(),
                    "footer": {
                        "text": "Garage"
                    },
                    "fields": [
                        {
                            "name": "Model",
                            "value": userDataGarage[0].model,
                            "inline": true
                        }]
                }
            });
        };
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query('SELECT * FROM public."garageView" WHERE userid = $1',[message.author.id]);
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log("Test2");
            if (result.rows.length > 0) {
                InsertEmbed(result.rows);
                client.end();
            }
            else {
                message.reply("There is no vehicle in your garage.");
                client.end();
            }
        });
    }

}

module.exports = GarageCommand;
