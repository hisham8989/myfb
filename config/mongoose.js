const mongoose = require('mongoose')
const env = require('./environment')

let dbName = env.db;
mongoose.connect('mongodb://localhost:27017/' + dbName)

const db = mongoose.connection

db.on('error',console.error.bind(console,"Error in in connecting to MongoDb"))

db.once('open',function () {
  console.log("Connected to Database :: MongoDb",dbName);
})


module.exports = db;