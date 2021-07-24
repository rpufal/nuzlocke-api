const {runsService} = require('../services')

const getAll = async (_req, res) => {
  const response = await runsService.getAll();
  return res
    .status(200)
    .json(response);
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
  create
};