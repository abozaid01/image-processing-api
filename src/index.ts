import express from "express";
import router from "./routes";
import { thumbExists } from "./utils/utils";

const app = express();
const port: number = 3000;

//use express middleware
app.use(express.json());

//use express middleware to get /api endpoint
app.use("/api", router);

//set root endpoint
app.get("/", (req: express.Request, res: express.Response): void => {
    res.send("hello world");
});

//check for port to avoid allready in use error testing
app.listen(port, () => {
    // calling the utility function that will initializes the thumb directory if it doesn't exist
    thumbExists();
    console.log(`Listening on Port ${port}`);
});

export default app;
