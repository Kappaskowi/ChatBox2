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
        var db_query = "SELECT cash, bankamount FROM public.bank WHERE userid = " + message.author.id;
        pgClient.connect(function (err) {
            console.log("Connected!");
            pgClient.query(db_query, function (err, result) {
                if (err) {
                    console.log(err.code);
                    pgClient.end();
                } else
                    var db_result = JSON.stringify(result.rows, null, "    ");
                console.log(db_result);
                pgClient.end();
            });
        });
        //let money = JSON.parse(fs.readFileSync("./json/money.json", "utf8"));
        if (!money[message.author.id]) money[message.author.id] = {
            money: 0
        };
        var userDataMoney = JSON.parse(db_result);
        consolel.log(userDataMoney);
        console.log(userDataMoney.cash);
        message.channel.send({
            embed: {
                color: 3447003,
                description: "Bank"
            },
            fields: [{
                name: "Cash",
                value:  userDataMoney.cash
            }]
        }
        );
        //var db_query = "INSERT INTO public.bank(userid, cash, bankamount, balance) VALUES ("+message.author.id+", 1000, 1000, 2000)";

    }
}

module.exports = MoneyCommand;
