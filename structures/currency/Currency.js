const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
var level = function(num) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.end();
	return "test";
};
module.exports = level;