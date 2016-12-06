
/*
 * GET home page.
 */

var mysql = require('mysql');
var config = require('./connection.js').config;

exports.index = function (req, res) {
    res.render('graphs.jade', { title: 'Express' });
};

exports.getRatings = function (req, res) {
    var connection = mysql.createConnection(config);

    connection.query("SELECT * FROM feedback", function (err, rows, field) {
        if (err) throw err;
        
        connection.end();

        res.send(rows);
    });
}