const { Router } = require("express");
const { findAll, findOne, createUrl } = require("../controllers/urls");
const {
  postRequestValidations,
  getRequestValidations,
} = require("../middlewares/urls/index");

const router = Router();

router.get("/short", findAll);
router.get("/:shortUrl", getRequestValidations, findOne);
router.post("/", postRequestValidations, createUrl);

module.exports = router;
