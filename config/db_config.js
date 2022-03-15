// mongodb config
const AccessString = 'mongodb://user:password@mongo:27017';
const ERR_NODB = 'please set database name.';
const ERR_NOCOLL = 'please set collection name.';
const ERR_COLLNOEXIST = 'choose collection is not exist.';

module.exports = {
    AccessString:AccessString,
    ERR_NODB:ERR_NODB,
    ERR_NOCOLL:ERR_NOCOLL,
    ERR_COLLNOEXIST:ERR_COLLNOEXIST,
}