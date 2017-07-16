const commando = require('discord.js-commando');
const fs = require("fs");
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
            var userDataGarage = JSON.parse(JSON.stringify(_rows, null, "    "));
            console.log(userDataGarage);
            message.channel.send({
                "embed": {
                    "description": message.author + " **Garage**",
                    "color": 12367392,
                    "timestamp": new Date(),
                    "footer": {
                        "text": "Garage"
                    },
                    "fields": [
                        {
                            "name": "Model",
                            "value": userDataGarage[0],
                            "inline": true
                        }]
                }
            });
        };
        var query = client.query('SELECT public.getgarage($1)'[message.author.id]);
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
                message.reply("There is no vehicle in your garage.");
                client.end();
            }
        });
    }

}

module.exports = GarageCommand;