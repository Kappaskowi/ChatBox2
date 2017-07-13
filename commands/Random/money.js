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
        var db_query = "INSERT INTO public.bank(userid, cash, bankamount, balance) VALUES ("+message.author.id+", 1000, 1000, 2000)";
        pgClient.connect(function (err) {
            console.log("Connected!");
            pgClient.query(db_query, function (err, result) {
                if (err) {
                    console.log(err.code);
                    if(err.code = 23505) {
                        pgClient.query("UPDATE public.bank SET cash = 1000, bankamount = 1000, balance = 2000 WHERE userid = " + message.author.id);
                    }
                    pgClient.end();
                } else
                console.log("1 record inserted "+message.author.id);
                pgClient.end();
            });
        });
    }
}

module.exports = MoneyCommand;
