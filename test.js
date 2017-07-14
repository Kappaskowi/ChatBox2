const commando = require('discord.js-commando');
const bot = new commando.Client();
const fs = require("fs");
var pg = require("pg");
bot.registry.registerGroup('random', 'Random');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);
//var http = require('http'); http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.send('it is running\n'); }).listen(process.env.PORT || 5000);
bot.login(process.env.BOT_TOKEN);

