const Url = require("../models/url");

class UrlRepository {
  constructor() {}

  async findAll() {
    return await Url.find();
  }

  async findOne(shortUrl) {
    return await Url.findOne({ shortUrl });
  }

  async create(url) {
    return await Url.create(url);
  }

  async remove(shortUrl) {
    return await Url.deleteOne({ shortUrl });
  }
}

module.exports = UrlRepository;
