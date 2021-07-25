const { usersModel } = require('../models');
const { ObjectId } = require('mongodb');

const validateError = (status, message) => ({ status, message });

const create = async({username, password, email, country}) => {
  const idObject = await usersModel.create({ username, password, email, country });
  return idObject;
}

const getAll = async () => {
  const users = await usersModel.getAll();
  return users;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw validateError(404, 'user not found');
  const user = await usersModel.getById(id);
  if (!user) throw validateError(404, 'user not found');
  return user;
};

const updateById = async ({id, username, email, password, country}) => {
  const user  = await usersModel.updateById({id, username, email, password, country});
  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById
};