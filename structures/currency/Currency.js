const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
module.exports = function (user) {
    return {
        var : userDataMoney = '',
        getBalance: function () {
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
                }
                console.log(userDataMoney);
                return userDataMoney;
            });
        }
    };
};