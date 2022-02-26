const mongoose = require('mongoose')

// error in connecting data base
main().catch((err) => console.log(err))

// connection to db
async function main() {
  let dbName = 'codiel_development'
  await mongoose.connect('mongodb://localhost:27017/' + dbName)
  console.log('DB Connected to', dbName)
}
