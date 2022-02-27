const mongoose = require('mongoose')

let dbName = 'codiel_development'
mongoose.connect('mongodb://localhost:27017/' + dbName)

const db = mongoose.connection

db.on('error',console.error.bind(console,"Error in in connecting to MongoDb"))

db.once('open',function () {
  console.log("Connected to Database :: MongoDb");
})


module.exports = db;