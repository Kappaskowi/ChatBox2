const pg = require("pg");
var connectionString = process.env.DATABASE_URL;
// class Currency {
//      getBalance(user) {
//     var userDataMoney = '';
//     var client = new pg.Client(connectionString);
//     client.connect();
//     var query = client.query("SELECT cash, bankamount FROM public.bank WHERE userid = " + user);
//     query.on("row", function (row, result) {
//         result.addRow(row);
//     });
//     query.on("end", function (result) {
//         if (result.rows.length > 0) {
//             userDataMoney = JSON.parse(JSON.stringify(result.rows, null, "    "));
//             client.end();
//             return userDataMoney;
//         }
//     });
// }
//}
module.exports = function(pName) {
  return {
    test1: function() {
       console.log('In test 1 '+pName);
    },
    test2: function() {
       console.log('In test 2 '+pName);
    }
  };
};