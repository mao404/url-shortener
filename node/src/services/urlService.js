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

module.exports = {
  findAll,
  findOne,
  save,
};
