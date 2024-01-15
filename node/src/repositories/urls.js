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
}

module.exports = UrlRepository;
