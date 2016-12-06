
/*
 * GET users listing.
 */

var mysql = require('mysql');
var config = require('./connection.js').config;

exports.list = function (req, res) {

    for (i = 0; i < 1000; i++) {
        var connection = mysql.createConnection(config);
        var rand1 = (Math.floor(Math.random() * 9) / 2) + 0.5;
        var rand2 = Math.floor(Math.random() * 7);
        var random1 = Math.floor(Math.random() * 27) + 1;
        var random2 = Math.floor(Math.random() * 12) + 1;
        var year = random2 == 12 ? "2015" : "2016";
        //if (random2 == 12) console.log(random1 + "/" + random2 + "/" + year);
        var date = new Date(random2 + "/" + random1 + "/" + year).toISOString();
        date = date.substr(0, date.length - 5);
        date = date.replace("T", " ");
        
        var sql = "INSERT INTO feedback SET r_arroz=" + rand1 + ", c_arroz=" + rand2 + ", horario=\"" + date + "\"";
        //console.log(sql);

        // Execute sql query
        connection.query(sql, function (err, result) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            
            var log = 'Post ' + result.insertId + ' added';
            console.log(log);

            connection.end();
        });
    }

    res.redirect('/');
};