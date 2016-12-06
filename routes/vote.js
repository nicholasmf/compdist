
/*
 * POST vote page.
 */

var mysql = require("mysql");
var config = require ('./connection.js').config;

exports.index = function (req, res) {
    var data = req.body;
    var dataname = Object.getOwnPropertyNames(data);
    var connection = mysql.createConnection(config);
    
       
    console.log(data);

    var map = {
        "Arroz": "arroz",
        "Arroz Integral": "arroz_integral",
        "Feijao": "feijao",
        "Salada": "salada",
        "Prato Principal": "prato",
        "Opção Vegetariana": "vegetariana",
        "Guarnição": "guarnicao",
        "Sobremesa": "sobremesa",
        "Suco": "suco"
    }
    var sql = "INSERT INTO feedback SET ";
    

    // Print on console all parameters received
    dataname.splice(dataname.indexOf("__proto__", 1));
    console.log(dataname);
    if (dataname.length > 0) {
        var comments = [];
        dataname.map(function (d) {
            console.log(d + ": " + data[d]);
            var category = d.split("_")[1];
            var type = d.split("_")[0][0];
            if (type == 'r') {
                sql += type + "_" + map[category] + '=' + data[d] + ',';
            }
            // comentarios
            else if (type == 'c' && (data[d] == "true" || data[d] == "on")) {
                var comment = d.split("_")[0];
                var exponent = comment[comment.length - 1];
                if (comments[category]) {
                    comments[category] += Math.pow(2, exponent);
                }
                else {
                    comments[category] = Math.pow(2, exponent);
                }
            }
            // testes
	        else if (d == "Arroz") {
		        sql += 'r_arroz=' + data[d] + ',';
	        }
        });
        
        for (var cat in comments) {
            sql += "c_" + map[cat] + '=' + comments[cat] + ',';
            console.log(cat + " " + comments[cat]);
        }
        
        sql += "res_id=" + data.id_res + ";";
        //sql = sql.replace(/,$/, ";");
        console.log("sql = " + sql);

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
    else console.log("no data received");
    
    // Redirect to home
    res.redirect('/');
};
