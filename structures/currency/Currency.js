const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
class Currency {
    static async getBalance(user) {
        var userDataMoney = 0;
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("SELECT cash, bankamount FROM public.bank WHERE userid = " + user);
        query.on("row", function (row, result) {
            result.addRow(row);
            console.log("Test1");
        });
        query.on("end", function (result) {
            console.log("Test2");
            if (result.rows.length > 0) {
                 userDataMoney = JSON.parse(JSON.stringify(result.rows, null, "    "));
                console.log(userDataMoney);
                client.end();
            }
        });
        return parseInt(userDataMoney[0].cash);
    }

}
module.exports = Currency;
