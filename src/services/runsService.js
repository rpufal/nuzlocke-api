const { runsModel, usersModel } = require('../modelsMONGO');
const { ObjectId } = require('mongodb');

const validateError = (status, message) => ({ status, message });

const create = async({game, userId}) => {
  const {username} = await usersModel.getById(userId);
  const ObjectId = await runsModel.create({ game, userId });
  return {ObjectId, username};
}

const getAll = async () => {
  const runs = await runsModel.getAll();
  return runs;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw validateError(404, 'run not found');
  const run = await runsModel.getById(id);
  if (!run) throw validateError(404, 'run not found');
  return run;
};

const updateById = async ({game, status, id, userId}) => {
  if (!ObjectId.isValid(id)) throw validateError(404, 'run not found');
  const runPreupdate = await runsModel.getById(id);
  if (userId !== runPreupdate.userId) throw validateError(409, 'user not allowed')
  await runsModel.updateById(id, game, status);
  const runUpdated = await runsModel.getById(id);
  return runUpdated;
};


module.exports = {
  getAll,
  getById,
  create,
  updateById
};