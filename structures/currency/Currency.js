const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
var level = function (num) {
    var test = {};
    var client = new pg.Client(connectionString);
    client.connect();
    var query = client.query('SELECT * from public.bank WHERE userid = 304369797930418181')
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log("Test2");
        if (result.rows.length > 0) {
            this.num = JSON.parse(JSON.stringify(result.rows, null, "    "));
            console.log("DB return 1 : " + num);
            client.end();
        }
    });
    console.log("DB return 2 : " + num);
    return this.num;
};
module.exports = level;
