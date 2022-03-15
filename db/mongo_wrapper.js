import { MongoClient } from "mongodb";
import conf from "../config/db_config"

module.exports = class {
    'use strict'
    constructor(){
        this.connected = false;
        this.client = new MongoClient(conf.AccessString);
    }

    /** database name setting */
    setDbName(usedb){
        this.usedb=usedb;
    }

    /** collection name setting */
    setCollectionName(collectionName){
        this.colname = collectionName;
    }

    /**
     * initial function
     * at the 1st, call stDbName and setCollectionName.
     * after, call this function.
     */
    async init() {
        await this.connect(this.usedb);
        this.setDbName.createCollection(this.colname, (err, res) => {
            if(err && err.codeName != "NamespaceExists") throw err;
            else console.log(this.colname + ' collection created!');
        });
        this.setCollection(this.colname);
        return true;
    }

    /**
     * get connection func
     * @param {String} usedb 
     */
    async connect(usedb){
        await this.client.connect();
        this.db = this.client.db(usedb);
        this.connected = true;
    }

    /**
     * Define collection
     * @param {String} collectionName 
     */
    setCollection(collectionName){
        this.collection = this.db.collection(collectionName);
    }

    /**
     * close connection func
     */
    async close() {
        await this.client.close();
        this.connected = false;
        this.collection = null;
    }

    /**
     * insert function
     * @param {json} query 
     */
    async insert(query){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            if(query instanceof Array) {
                await this.collection.insertMany(query, function(err, res) {
                    if(res || !err) result = res;
                    else console.log("[insertMany]error : " + err)
                });
            } else {
                await this.collection.insertOne(query, function(err, res) {
                    if(res || !err) result = res;
                    else console.log("[insertOne]error : " + err)
                });
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }

    /**
     * delete function
     * @param {json} query 
     * @param {boolean} multiflag 
     * @returns 
     */
    async delete(query, multiflag){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            if(multiflag) {
                await this.collection.deleteMany(query, function(err, res) {
                    if(res || !err) result = res;
                    else console.log("[deleteMany]error : " + err)
                });
            } else {
                await this.collection.deleteOne(query, function(err, res) {
                    if(res || !err) result = res;
                    else console.log("[deleteOne]error : " + err)
                });
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }

    /**
     * find function
     * @param {json} query 
     * @returns 
     */
    async find(query){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            if(!query) {
                result = await this.collection.find().toArray();
            } else {
                result = await this.collection.find(query).toArray();
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }

    /**
     * aggregate function
     * @param {json} query 
     * @returns 
     */
    async aggregate(query){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            result = await this.collection.aggregate(query).toArray();
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }

    /**
     * find distinct function
     * @param {string} targetKey 
     * @returns 
     */
    async distinct(targetKey){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            result = await this.collection.distinct(targetKey);
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }

    /**
     * dorp this.collection
     * @returns 
     */
    async dropCollection(){
        if(!this.usedb) throw conf.ERR_NODB;
        if(!this.colname) throw conf.ERR_NOCOLL;
        let result = false;
        try{
            if(!this.collection) throw conf.ERR_COLLNOEXIST;
            result = await this.collection.drop();
        }
        catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }
}