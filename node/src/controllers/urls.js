const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const urlService = require("../services/urlService");
const Success = require("../handlers/successHandler");

const findAll = async (req, res, next) => {
  try {
    url = await urlService.findAll();

    res.status(200).json(new Success(url));
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    url = await urlService.findOne(shortUrl);
    url.clicks++;
    url.save();
    res.status(200).json(new Success(url));
    return;
  } catch (err) {
    next(err);
  }
};

const createUrl = async (req, res, next) => {
  try {
    let url = req.body;
    (req.body.shortUrl = uid.rnd()), (url = await urlService.save(url));

    res.status(201).json(new Success(url));
  } catch (err) {
    next(err);
  }
};

const removeUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    let url = await urlService.remove(shortUrl);
    res.status(200).json(new Success(url));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findOne,
  createUrl,
  removeUrl,
};
