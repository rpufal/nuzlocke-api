const {usersService} = require('../services')

const getAll = async (_req, res) => {
  const response = await usersService.getAll();
  return res
    .status(200)
    .json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await usersService.getById(id);
  return res
    .status(200)
    .json(response);
};


const updateById = async (req, res) => {
  const { id } = req.params;
  const { password, username, email, country } = req.body;
  await usersService.updateById({password, username, email, country, id});
  return res
    .status(200)
    .json({id, password, username, email, country});
};

const create = async (req, res) => {
  const { password, username, email, country } = req.body;
  const { id } = await usersService.create({ username, password, email, country });
  return res
    .status(201)
    .json({ run: { username, password, userId: id, country, email } });
};

module.exports = {
  getAll,
  getById,
  updateById,
  create
};