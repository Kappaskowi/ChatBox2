const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
const Currency = require('../../structures/currency/Currency');
var connectionString = process.env.DATABASE_URL;

class DealershipCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'dealership',
      group: 'random',
      memberName: 'dealership',
      description: 'dealership',
      examples: ['dealership buy carid'],
      args: [
        {
          key: 'text',
          label: 'dealership',
          prompt: 'What would you like to do?',
          type: 'string',
          default: 'show'
        },
        {
          key: 'content',
          prompt: 'What type of vehicle would you like to buy?',
          type: 'integer',
          default: ''
        }
      ]
    });
  }
  async run(message, args) {
    const text = args.text;
    const content = args.content;
    var _currency = require('../../structures/currency/Currency')('test');
    console.log(_currency.test1());
    var client = new pg.Client(connectionString);
    client.connect();
    if (text === "buy" && content) {
      var query = client.query('SELECT public.addGarage ($1,$2)', [message.author.id, content]);
      query.on("row", function (row, result) {
        result.addRow(row);
        console.log(row);
      });
      query.on('error', function (err) {
        console.log('Query error: ' + err.code);
        if (err.code == 23503) {
          message.reply("The vehicle you're trying to buy does not exist.");
        }
        if (err.code == 23505) {
          message.reply("Your garage is full.");
        }
        client.end();
      });
      query.on("end", function (result) {
        console.log("Test2");
        if (result.rows.length > 0) {
          var userDataGarage = JSON.parse(JSON.stringify(result.rows, null, "    "));
          message.channel.send(message.author + " just bought a " + userDataGarage[0].addgarage);
          client.end();
        }
      });
    };
    if (text === "show") {
      var query = client.query('SELECT * FROM public."dealershipView"');
      query.on("row", function (row, result) {
        result.addRow(row);
        message.channel.send({
          embed: {
            color: 3447003,
            description: row.model,
            "thumbnail": {
              "url": row.img
            },
            "fields": [
              {
                "name": "Price",
                "value": "$" + row.price,
                "inline": true
              },
              {
                "name": "ID",
                "value": row.carid,
                "inline": true
              },
              {
                "name": "Available",
                "value": row.amount,
                "inline": true
              }
            ]
          }
        });
      });
      query.on("end", function (result) {
        console.log("Test2");
        if (result.rows.length > 0) {
          console.log(result.rows);
          client.end();
        }
      });
    };
  }
};
module.exports = DealershipCommand;
