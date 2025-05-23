import { Router } from "express";
import { findAll, findOne, createUrl, removeUrl } from "../controllers/urls";
import {
  postRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
} from "../middlewares/urls/index";

const router = Router();

router.get("/", findAll);
router.get("/:shortUrl", getRequestValidations, findOne);
router.post("/", postRequestValidations, createUrl);
router.delete("/:shortUrl", deleteRequestValidations, removeUrl);

export default router;
