import express from "express";
import image from "./api/image";
import { requestValidator } from "../utils/utils";

const router = express.Router();

//use express middleware to get /api/image endpoint and apply requestvalidator function to it
router.use("/", requestValidator, image);

export default router;
