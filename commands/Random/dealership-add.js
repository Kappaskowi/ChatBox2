const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
var connectionString = process.env.DATABASE_URL;

class DealershipAddCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'dealership-add',
      group: 'random',
      memberName: 'dealership-add',
      description: 'Add a vehicle to the dealership.',
      examples: ['dealership-add carid price amount'],
      args: [
        {
          key: 'carid',
          prompt: 'What type of vehicle would you like to add?',
          type: 'integer'
        },
        {
          key: 'price',
          prompt: 'What should the price be?',
          type: 'integer'
        },
        {
          key: 'amount',
          prompt: 'How many of that type would you like to add?',
          type: 'integer',
          default: 1
        }
      ]
    });
  }
  async run(message, args) {
    const carid = args.carid;
    const price = args.price;
    const amount = args.amount;
    var client = new pg.Client(connectionString);
    client.connect();
    if (text === "add" && content) {
      var query = client.query('SELECT public.adddealership ($1,$2,$3)', [carid, price, amount]);
      query.on("row", function (row, result) {
        result.addRow(row);
        console.log(row);
      });
      query.on('error', function (err) {
        console.log('Query error: ' + err.code);
        if (err.code == 23503) {
          message.reply("The vehicle you're trying to add does not exist.");
        }
        if (err.code == 23505) {
          message.reply("Vehicle is already available in the dealership.");
        }
        client.end();
      });
      query.on("end", function (result) {
        console.log("Test2");
        if (result.rows.length > 0) {
          var userDataGarage = JSON.parse(JSON.stringify(result.rows, null, "    "));
          message.channel.send(message.author + " just added a " + userDataGarage[0].adddealership + " to the dealership.");
          client.end();
        }
      });
    };
  }
};
module.exports = DealershipAddCommand;
    





