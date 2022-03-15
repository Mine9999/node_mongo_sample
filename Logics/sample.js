const logdb = require('../db/weeklydb_controller');
const db = require('../db/mongodb_controller');
const util = require('../helpers/common_util');

'use strict'

/**
 * use sample @ find "_id"
 * @returns string|bool
 */
module.exports.findAndResponse = async () => {
    // db initialization
    if(!db.connected) await db.init();
    // call find function searching for _id
    let results = await db.find({_id:"xxxxxxxx"});

    // check result & response set
    if(results instanceof array
        && results.length > 0) return results[0];
    else return false;
}

/**
 * Monthly logging process (Create a new collection each month)
 * @param {json} logdata 
 */
module.exports.loggingMonthly = async (logdata) => {
    // set collection name (=m_ + month ex: m_4, m_12)
    const _col = "m_" + util.nowMonth();

    // db initialization
    if(!logdb.connected){
        // case: disconnected database
        logdb.setCollectionName(_col);
        await logdb.init();
    } else if(logdb.connected && logdb.cn != _col){
        // case: connected, but different collection
        await logdb.close();
        logdb.setCollectionName(_col);
        await logdb.init();
    }

    // call insert function
    logdb.insert(logdata).catch(err => console.log(err));

    // insert data format (json) sample
    // logdb.insert({
    //     _id: "uniq id",
    //     data: "any format data",
    //     type: "accesslog/errorlog",
    //     ...
    // })

}