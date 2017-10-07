
const app = require('express')();
const env = app.get('env');


const isTest = env==='test';
const isProd = env==='production';
const isDev  = env==='development';
const path = require('path');


const DB_ERROR = 420;


console.log('===> app is running in "' ,env , '" mode');

let configs = {
    "development": {
        "host": "localhost:3000",
        "db_name": "Graph",
        "db_uri": "mongodb://127.0.0.1:27017/graph",
    },
    "production": {
        // "host": "localhost:3000",
        "db_name": "Graph",
        "db_uri": process.env.MONGODB_URI,
    }

};


module.exports = {

    host: configs[env].host,
    db_name: configs[env].db_name,
    db_uri: configs[env].db_uri,
    isProd,
    isDev,
    isTest,
};