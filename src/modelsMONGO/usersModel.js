const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const users = await usersCollection.find().toArray();
  return users;
};

const getById = async (id) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const user = await usersCollection.findOne(new ObjectId(id));
  return user;
};

const getByEmail = async (email) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const response = await usersCollection
    .find({ email }).toArray();
  return response;
};

const updateById = async ({id, username, email, password, country}) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));

  await usersCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { username, email, password, country } });
  return {id, username, email, password, country}
};

const create = async ({ email, username, password, country}) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const { insertedId } = await usersCollection
  .insertOne({ username, email, password, country });

  return {
    id: insertedId,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  getByEmail
}