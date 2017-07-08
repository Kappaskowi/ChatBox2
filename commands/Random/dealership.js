const commando = require('discord.js-commando');
const fs = require("fs");
class DealershipCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dealership',
            group: 'random',
            memberName: 'dealership',
            description: 'dealership'
        });
    }
    async run(message, args) {
        let deal_command = args.split(' ');
        let dealership = JSON.parse(fs.readFileSync("./json/dealership.json", "utf8"));
        let DataDealership = [];
        for (var prop in dealership) {
            DataDealership.push(dealership[prop]);
        }
        if (deal_command[0] === "buy") {
            var obj = [];
            obj.push(message.author.id);
            obj.push(DataDealership[deal_command[1]]);
            fs.writeFile("./json/garage.json", JSON.stringify(obj), (err) => {
                if (err) console.error(err)
            });
        }
        else {
           for(let i = 0; i < 3; i++) {
            message.channel.send({embed: {
            color: 3447003,
            description: "A very simple Embed!"
            }});
           }
        }
    }
}


module.exports = DealershipCommand;
