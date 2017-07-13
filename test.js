// Requires
/*
const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require("fs");
*/
// Create an instance of a Discord client
const commando = require('discord.js-commando');
const bot = new commando.Client();
const fs = require("fs");
var pg = require("pg");
bot.registry.registerGroup('random','Random');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);
//var http = require('http'); http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.send('it is running\n'); }).listen(process.env.PORT || 5000);
bot.login(process.env.BOT_TOKEN);
exports.testDB = function() {
pgClient.connect();
 var query = pgClient.query("SELECT * FROM public.bank");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log(JSON.stringify(result.rows, null, "    "));
            pgClient.end();
        });
}
/*
// The bot is ready
client.on('ready', () => {
  console.log('Bot Started')
})
let points = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));
let money = JSON.parse(fs.readFileSync("./json/money.json", "utf8"));
const prefix = "+";

client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
   if (!money[message.author.id]) money[message.author.id] = {
    money: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let userDataMoney= money[message.author.id];

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  var robbedAmmount = Math.floor(Math.random() * 1000) + 1;
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
  }
    if (message.content.startsWith(prefix + "money")) {
     const embed = new Discord.RichEmbed()
  .setTitle("Money")
  .setAuthor(message.author, "https://i.imgur.com/lm8s41J.png")
  .setColor(0x00AE86)
  .setDescription("Bank")
  .setFooter("Bank", "http://i.imgur.com/w1vhFSR.png")
  .setTimestamp()
  .addBlankField(true)
  .addField("Balance", userDataMoney.money , false);

  message.channel.send({embed});
  }
      if (message.content.startsWith(prefix + "rob")) {
    userDataMoney.money = userDataMoney.money + robbedAmmount;
    message.reply(`You robbed $${robbedAmmount}.`);
    message.reply(`Your current balance is $${userDataMoney.money}.`);    
  }
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });
  fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if (err) console.error(err)
  });
  
 
});
*/ 
//client.login(process.env.BOT_TOKEN)
