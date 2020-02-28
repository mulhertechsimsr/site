var db = require('../database/database');
var columns = "id, user_id, items, datetime, canceled";
var insertColumns = ["user_id", "items"];

var table = "encomendas"
var find = () => {
    var query = db.getQuery.find(columns, table, false, false, false);
    return db.doQuery(query);
}    

var insert = async(values) => {
  try {
    var query = db.getQuery.insertOne(table, insertColumns, values);
    var result = await db.doQuery(query);
    return result.insertId;
  } catch (e) {
    return false;
  }
}

module.exports.find = find
module.exports.insert = insert