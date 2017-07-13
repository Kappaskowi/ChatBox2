const commando = require('discord.js-commando');
const fs = require("fs");
const pg = require("pg");
var helper = require("test.js");
var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);

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
        pgClient.connect();
        var query = pgClient.query("INSERT INTO public.bank(userid, cash, bankamount, balance) VALUES ("+ message.id.author + ", 1000, 1000, 2000); UPDATE public.bank SET cash = 1000, bankamount = 1000, balance = 3000 WHERE userid =" + message.author.id);
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log(JSON.stringify(result.rows, null, "    "));
            pgClient.end();
        });
    }
}

module.exports = MoneyCommand;
