const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
const pool = require('pg-db');
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
    var client = new pg.Client(connectionString);
    client.connect();
    if (text === "buy" && content) {
      console.log(message.author.id + " bought " + content);
      client.query('SELECT * FROM public.car', function (err, result) {
        if (err) {
          console.error(err);
        }
        else
          console.log(result);
        console.log("end");
        client.end();
      });
    }
    if (text === "show") {
      for (let i = 0; i < DataDealership.length; i++) {
        message.channel.send({
          embed: {
            color: 3447003,
            description: DataDealership[i].model,
            "thumbnail": {
              "url": DataDealership[i].img
            },
            "fields": [
              {
                "name": "Price",
                "value": "$" + DataDealership[i].price
              }]
          }
        })
      };
    }
  }
};
module.exports = DealershipCommand;
