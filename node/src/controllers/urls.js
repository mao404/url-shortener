const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const urlService = require("../services/urlService");
const Success = require("../handlers/successHandler");
const { getAsync, setAsync, delAsync } = require("../loaders/redis/redis");

const findAll = async (req, res, next) => {
  try {
    const cachedData = await getAsync("urls");
    if (cachedData) {
      res.status(200).json(new Success(JSON.parse(cachedData)));
    } else {
      const url = await urlService.findAll();
      await setAsync("urls", JSON.stringify(url));
      res.status(200).json(new Success(url));
    }
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
    await delAsync("urls");
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
