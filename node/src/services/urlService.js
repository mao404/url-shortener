const UrlRepository = require("../repositories/urls");
const repository = new UrlRepository();

const findAll = async () => {
  return await repository.findAll();
};

const findOne = async (shortUrl) => {
  return await repository.findOne(shortUrl);
};

const save = async (user) => {
  return await repository.create(user);
};

const remove = async (shortUrl) => {
  return await repository.remove(shortUrl);
};

module.exports = {
  findAll,
  findOne,
  save,
  remove,
};
