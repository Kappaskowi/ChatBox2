const commando = require('discord.js-commando');
const fs = require("fs");
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
          type: 'integer'
        }
      ]
    });
  }
  async run(message, args) {
    //const dealer= buy.dealership;
    //const buy = args.number;
    let dealership = JSON.parse(fs.readFileSync("./json/dealership.json", "utf8"));
    let DataDealership = [];
    for (var prop in dealership) {
      DataDealership.push(dealership[prop]);
    }
    if (deal_command[0] === "buy") {
      var obj = [];
    }
    else {
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
