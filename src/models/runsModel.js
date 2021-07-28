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

const updateById = async (id, game, attempt) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));

  await runsCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { game,attempt } });
  return { id, game, attempt };
};

const create = async ({ game, userId}) => {
  const runsCollection = await connection()
    .then((db) => db.collection('runs'));
  const { insertedId } = await runsCollection
  .insertOne({ game, attempt: 1, userId });

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