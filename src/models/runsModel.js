const connection = require('./connection');

const getAll = async () => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const runs = await runsCollection.find().toArray();
  return runs;
};


const create = async ({ game, user}) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const { insertedId } = await runsCollection
  .insertOne({ game, name });

  return {
    id: insertedId,
  };
};

module.exports = {
  getAll,
  create
}