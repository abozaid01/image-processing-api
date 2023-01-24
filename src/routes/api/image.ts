import express from "express";
import path from "path";
import fs from "fs";
import { checkFile, resizeImg } from "../../utils/utils";

const image = express.Router();

image.get(
    "/",
    async (req: express.Request, res: express.Response): Promise<void> => {
        //middleware function to validate the request. The first stage of the endpoint is
        //to make sure if the file with the parameters passed
        //already exists then to load that file.
        console.log(req.params);

        const fileExist = checkFile(req);

        if (!fileExist[0]) {
            //because the file in the query doesn't exist, we need to check the original file,
            //by reading it, resizing it, saving it and then loading it.
            const originalPath = `./assets/full/${req.query.fileName}.jpg`;
            let width: unknown = req.query.width as string;
            let height: unknown = req.query.height as string;

            //validate the passed parameters are numbers.
            if ((height as string).match(/[a-z]/gi) !== null) {
                res.status(400).write("height parameter isn't number");
                res.end();
                return;
            } else {
                (height as number) = parseInt(height as string);
            }

            if ((width as string).match(/[a-z]/gi) !== null) {
                res.status(400).write("width parameter isn't number");
                res.end();
                return;
            } else {
                (width as number) = parseInt(width as string);
            }

            // if (isNaN(height as number) || isNaN(width as number)) {
            //     if (isNaN(height as number)) {
            //         res.status(400).write(
            //             "height parameter isn't number or missing"
            //         );
            //     } else if (isNaN(width as number)) {
            //         res.status(400).write(
            //             "width parameter isn't number or missing"
            //         );
            //     }
            //     res.end();
            //     return;
            // }

            //if the path is correct and the file exists, then resize the img.
            if (fs.existsSync(originalPath)) {
                const resizeSuccess = await resizeImg(
                    originalPath,
                    width as number,
                    height as number,
                    fileExist[1] //file path
                );

                //if resizing success, send the file to the endpoint
                if (resizeSuccess) {
                    res.sendFile(path.resolve(fileExist[1]), (err) => {
                        if (err) {
                            console.log(err);
                            res.send(err.message);
                        } else {
                            console.log("file sent sucessfully");
                        }
                    });
                    // if resizing falis, send error msg to the endpoint
                } else {
                    res.status(422).send(
                        "error happend while processing the image."
                    );
                    return;
                }

                // if the path is not corret ):
            } else {
                const files = fs.readdirSync("./assets/full/");
                res.status(400).end(
                    `File parameter missing or doesn't exist. File Passed MUSt be:${files.toString()}`
                );
                return;
            }

            //If the file exists, send it from the cache
        } else {
            res.sendFile(path.resolve(fileExist[1]), (err) => {
                if (err) {
                    console.log(err);
                    res.send(err.message);
                } else {
                    console.log("File loaded from the cache");
                }
            });
        }
    }
);

export default image;
