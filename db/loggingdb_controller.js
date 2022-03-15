const DataBase = require("./mongo_wrapper");

// set database name.
const usedb = 'loggingDB';
// set collection name.
// const _col = 'collection';
const db = new DataBase();

db.setDbName(usedb);
// db.setCollectionName(_col);
// db.init();

module.exports = db;
