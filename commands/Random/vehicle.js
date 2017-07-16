const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;
class CreateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'vehicle',
            group: 'random',
            memberName: 'vehicle',
            description: 'Create a car.',
            examples: ['vehicle model img'],
            guildOnly: true,
            args: [
                {
                    key: 'model',
                    prompt: 'Model?',
                    type: 'string'
                },
                {
                    key: 'url',
                    prompt: 'Image-Url?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission('BAN_MEMBERS');
    }

    async run(message, args) {
        const url = args.url;
        const model = args.model;
         var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query('SELECT createvehicle($1,$2)',[model,url]);
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log("Test2");
            if (result.rows.length > 0) {
                message.reply(result.row + " was added to the vehicle list");
                client.end();
            }
            else {
                message.reply("Error.");
                client.end();
            }
        });
    }
};
module.exports = CreateCommand;