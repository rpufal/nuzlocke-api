const {runsService} = require('../services')

const getAll = async (_req, res) => {
  const response = await runsService.getAll();
  return res
    .status(200)
    .json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await runsService.getById(id);
  return res
    .status(200)
    .json(response);
};


const updateById = async (req, res) => {
  const { id } = req.params;
  const { game,user } = req.body;
  await runsService.updateById({game, user, id});
  return res
    .status(200)
    .json({id, game, user});
};

const create = async (req, res) => {
  const { game, user } = req.body;
  const { id } = await runsService.create({ game, user });
  return res
    .status(201)
    .json({ run: { game, user, runId: id } });
};

module.exports = {
  getAll,
  getById,
  updateById,
  create
};