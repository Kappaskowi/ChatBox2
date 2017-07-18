const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
var level = function(num) {
	return num > 40 ? "It's over 40!" : num;
};
module.exports = level;