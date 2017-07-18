const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
var level = function (num) {
    var test = '';
    var client = new pg.Client(connectionString);
    client.connect();
    var query = client.query('SELECT * from public.bank WHERE userid = 304369797930418181')
    query.on("row", function (row, result) {
        result.addRow(row);
        test = result;
    });
    client.end();
    console.log("DB return : " + test);
    return test;
};
module.exports = level;
