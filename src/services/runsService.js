const { runsModel } = require('../models');

const create = async({game, user}) => {
  const idObject = await runsModel.create({ game,user });
  return idObject;
}

const getAll = async () => {
  const recipes = await runsModel.getAll();
  return recipes;
};

module.exports = {
  getAll,
  create
};