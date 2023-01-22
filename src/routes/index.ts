import express from "express";
import image from "./api/image";
import { requestValidator } from "../utils/utils";

const router = express.Router();

//get request for /api endpoint
router.get("/", (req, res) => {
    res.send("api");
});

//use express middleware to get /api/image endpoint and apply requestvalidator function to it
router.use("/", requestValidator, image);

export default router;
