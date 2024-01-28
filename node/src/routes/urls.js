const { Router } = require("express");
const {
  findAll,
  findOne,
  createUrl,
  removeUrl,
} = require("../controllers/urls");
const {
  postRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/urls/index");

const router = Router();

router.get("/short", findAll);
router.get("/:shortUrl", getRequestValidations, findOne);
router.post("/", postRequestValidations, createUrl);
router.delete("/:shortUrl", deleteRequestValidations, removeUrl);

module.exports = router;
