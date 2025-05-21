const validator = require("validator");
const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const urlService = require("../../services/urlService").default;
const { validationResult } = require("../common");

const _urlRequired = check("fullUrl", "URL is required").not().isEmpty();

const _isValidUrl = check("fullUrl").custom(async (url = "") => {
  const isValid = validator.isURL(url);
  if (!isValid) {
    throw new AppError("URL is not valid", 400);
  }
});

const _shortUrlExist = check("shortUrl").custom(async (shortUrl = "") => {
  const shortUrlFound = await urlService.findOne(shortUrl);
  if (!shortUrlFound) {
    throw new AppError("URL Not found", 400);
  }
});

const postRequestValidations = [_urlRequired, _isValidUrl, validationResult];

const getRequestValidations = [_shortUrlExist, validationResult];

const deleteRequestValidations = [_shortUrlExist, validationResult];

module.exports = {
  postRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
};
