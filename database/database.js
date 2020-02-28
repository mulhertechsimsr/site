var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit    : 20,
    host               : 'mysql669.umbler.com',
    port               : 41890,
    user               : '3nc0m3nd45',
    password           : 'd#3SA_2dv4.G7u2',
    database           : 'encomendas',
    multipleStatements : true
});

doQuery = function (query) {
    var db = this;
    
    if(query.query){
        var values = query.values;
        var query = query.query;
    }
    
    return new Promise(function(resolve, reject){
        db.pool.getConnection(function(err, connection) {            
            if (err) reject(err);
        
            connection.query(query, values, function (err, result) {
                connection.release();
            
                if (err) reject(err)
                resolve(result);
                
            })
        });
    });
}

module.exports.getQuery = {
    findOne : function(cols, table, id){
        id = parseInt(id);
        return "SELECT "+cols+" FROM "+table+" WHERE id = " + id;
    },
    insertOne : function(table, columns, values){ 
        var cols = columns.join(",");     
        return {
            query: "INSERT INTO "+ table +" ("+ cols +") VALUES (?)",
            values: [values]
        }
    },
    updateOne : function(table, id, set){
        return "UPDATE "+ table +" SET "+set+" WHERE id = " + id
    },
    deleteOne : function(table, id){
        if(!id)
            return false;
            
        id = parseInt(id);
        return "DELETE FROM "+ table +" WHERE id = " + id
    }, 
    findAll : function(table){
        return "SELECT * FROM "+ table;
    },
    find : function(cols, table, where, order, limit){
        cols = cols || "*";
        
        var query = "SELECT "+ cols +" FROM "+table;
        
        if(where)
            query += " WHERE " + where
        
        if(order)
            query += " ORDER BY " + order
        
        if(limit)
            query += " LIMIT " + limit
        
        return query;
    }
};

module.exports.mysql = mysql;
module.exports.pool = pool;
module.exports.doQuery = doQuery;
