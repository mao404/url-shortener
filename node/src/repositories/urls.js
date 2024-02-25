const Url = require("../models/url");

class UrlRepository {
  constructor() {}

  async findAll() {
    return await Url.find({}, "_id fullUrl shortUrl clicks");
  }

  async findOne(shortUrl) {
    return await Url.findOne({ shortUrl }, "fullUrl shortUrl clicks");
  }

  async create(url) {
    return await Url.create(url);
  }

  async remove(shortUrl) {
    return await Url.deleteOne({ shortUrl });
  }
}

module.exports = UrlRepository;
