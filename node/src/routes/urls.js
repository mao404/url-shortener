const { Router } = require("express");
const { findAll, findOne, createUrl } = require("../controllers/urls");

const router = Router();

router.get("/short", findAll);
router.get("/:shortUrl", findOne);
router.post("/", createUrl);

module.exports = router;
