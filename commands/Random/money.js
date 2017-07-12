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
        var rollback = function (client) {
            //terminating a client connection will
            //automatically rollback any uncommitted transactions
            //so while it's not technically mandatory to call
            //ROLLBACK it is cleaner and more correct
            client.query('ROLLBACK', function () {
                client.end();
            });
        };

        pgClient.query('BEGIN', function (err, result) {
            if (err) return rollback(pgClient);
            pgClient.query('INSERT INTO Bank(userid,cash,bankamount,balance) VALUES('+ message.author.id +',100,1000,100,2000) WHERE id = $1', [1], function (err, result) {
                    if (err) return rollback(pgClient);
                    //disconnect after successful commit
                    pgClient.query('COMMIT', pgClient.end.bind(pgClient));
                });
            });
        fs.writeFile("./json/money.json", JSON.stringify(money), (err) => {
            if (err) console.error(err)
        });
    }
}

module.exports = MoneyCommand;
