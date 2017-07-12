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
        message.channel.send({
            embed: {
                color: 3447003,
                description: "A very simple Embed!"
            }
        }
        );
        var query = client.query("SELECT * FROM public.Bank");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log(JSON.stringify(result.rows, null, "    "));
            client.end();
        });
        fs.writeFile("./json/money.json", JSON.stringify(money), (err) => {
            if (err) console.error(err)
        });
    }
}

module.exports = MoneyCommand;
