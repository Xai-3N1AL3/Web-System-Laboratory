const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/Inventory')
        .then((client) => {
            dbConnection = client.db()
            console.log('Connected to MongoDB')
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb:() => dbConnection,
}