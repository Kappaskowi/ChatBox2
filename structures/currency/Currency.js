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
        });
        query.on("end", function (result) {
            if (result.rows.length > 0) {
                 userDataMoney = JSON.parse(JSON.stringify(result.rows, null, "    "));
                client.end();
                console.log(userDataMoney[0].cash);
                return userDataMoney[0].cash;
            }
        });
        
    }

}
module.exports = Currency;
