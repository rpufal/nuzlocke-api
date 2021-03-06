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
  const { userId } = req;
  const { game,attempt } = req.body;
  await runsService.updateById({game, attempt, id, userId});
  return res
    .status(200)
    .json({id, game, attempt, userId });
};

const create = async (req, res) => {
  const { game } = req.body;
  const { userId } = req;
  const { ObjectId, username } = await runsService.create({ game, userId });
  return res
    .status(201)
    .json({ run: { game, username , runId: ObjectId["id"], attempt: 1 } });
};

module.exports = {
  getAll,
  getById,
  updateById,
  create
};