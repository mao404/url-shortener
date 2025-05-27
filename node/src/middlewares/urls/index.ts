import validator from "validator";
import { check } from "express-validator";
import AppError from "../../errors/appError";
import urlService from "../../services/urlService";
import { validResult as validationResult } from "../common";

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

export const postRequestValidations = [
  _urlRequired,
  _isValidUrl,
  validationResult,
];
export const getRequestValidations = [_shortUrlExist, validationResult];
export const deleteRequestValidations = [_shortUrlExist, validationResult];
