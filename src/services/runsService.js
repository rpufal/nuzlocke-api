const { runsModel } = require('../models');
const { ObjectId } = require('mongodb');

const validateError = (status, message) => ({ status, message });

const create = async({game, user}) => {
  const idObject = await runsModel.create({ game,user });
  return idObject;
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

const updateById = async ({game, user, id}) => {
  const run = await runsModel.updateById(id, game, user);
  return run;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById
};