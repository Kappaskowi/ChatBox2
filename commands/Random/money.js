const commando = require('discord.js-commando');
const fs = require("fs");

class MoneyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'money',
            group: 'random',
            memberName: 'money',
            description: 'Balance'
        });
    }
    async run(message, args) {
        let money = JSON.parse(fs.readFileSync("./json/money.json", "utf8"));
        if (!money[message.author.id]) money[message.author.id] = {
            money: 0
        };
        let userDataMoney = money[message.author.id];
        message.channel.send({embed: {
        color: 3447003,
        author: {
            name: "Test",
        },
        title: "Bank",
        fields: [{
            name: "Balance",
            value: userDataMoney.money
            }]
          }
         );
           fs.writeFile("./json/money.json", JSON.stringify(money), (err) => {
            if (err) console.error(err)
        });
    }
}

module.exports = MoneyCommand;
