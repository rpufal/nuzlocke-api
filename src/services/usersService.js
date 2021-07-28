const { usersModel } = require('../models');
const { ObjectId } = require('mongodb');
const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  country: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async({username, password, email, country}) => {
  const { error } = userSchema.validate({ username, email, password, country });
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const userByEmail = await usersModel.getByEmail(email);
  if (userByEmail.length > 0) throw validateError(409, 'Email already registered');
  const idObject = await usersModel.create({ username, password, email, country });
  return idObject;
}

const getAll = async () => {
  const users = await usersModel.getAll();
  if (!users) throw validateError(404, 'user not found');
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

const login = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw validateError(401, 'All fields must be filled');
  const userByEmail = await usersModel.getByEmail(email);
  if (!userByEmail.length) throw validateError(401, 'Incorrect username or password');
  const passwordValid = password === userByEmail[0].password;
  if (!passwordValid) throw validateError(401, 'Incorrect username or password');
  const { _id } = userByEmail[0];
  return {
    _id,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById, 
  login
};