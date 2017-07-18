const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
var level = function (num) {
    var test = '';
    var client = new pg.Client(connectionString);
    client.connect();
    var query = client.query('SELECT * from public.bank WHERE userid = $1', [num])
    query.on("row", function (row, result) {
        result.addRow(row);
        test = row;
    });
    client.end();
    return test;
};
module.exports = level;