const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const runs = await runsCollection.find().toArray();
  return runs;
};

const getById = async (id) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const run = await runsCollection.findOne(new ObjectId(id));
  return run;
};

const updateById = async (id, game, user) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));

  await runsCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { game,user } });
  return { id, game, user };
};

const create = async ({ game, user}) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const { insertedId } = await runsCollection
  .insertOne({ game, user });

  return {
    id: insertedId,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById
}