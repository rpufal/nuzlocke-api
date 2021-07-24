const { MongoClient } = require('mongodb');


const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'Nuzlocke';

async function connection() {
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      const schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connection;