import express from "express";
import sharp from "sharp";
import fs from "fs";

// validation for the thumb directory if it exists or not
const thumbExists = (): void => {
    const thumbPath = "./assets/thumb";

    //make sure the directory /assets/thumb exists or not
    if (fs.existsSync(thumbPath)) {
        console.log("thumb directory already exists");
    } else {
        fs.mkdirSync(thumbPath);
        console.log("thumb directory created");
    }
};

// Middleware function to make sure that the passed request contains all required parameters
const requestValidator = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    let flag: boolean = true;
    const ParamsMissed: string[] = [];
    const { fileName, width, height } = req.query;

    if (!fileName && !width && !height) {
        res.send(
            "write in the parameters 'fileName', 'width' and 'height'" //it will be the original endpoint /image
        );
        return;
    }

    if (!fileName) {
        flag = false;
        ParamsMissed.push("fileName");
    }
    if (!width) {
        flag = false;
        ParamsMissed.push("width");
    }
    if (!height) {
        flag = false;
        ParamsMissed.push("height");
    }
    if (!flag) {
        res.status(400).send(
            `You are missing [${ParamsMissed}] in query parameters`
        );
        return;
    }

    next();
};

//check the file if exists and return it in a tuple with a boolean value and a string value
//The boolean value would be true if exist and false if not
//and the string value of the tuple would always be the file path whether it exists or not.
const checkFile = (req: express.Request): [boolean, string] => {
    const thumbDir = "./assets/thumb";
    const { fileName, width, height } = req.query;
    console.log(req.query);

    const filePath = `${thumbDir}/${fileName}_${width}_${height}.jpg`;

    if (fs.existsSync(filePath)) {
        return [true, filePath];
    } else {
        return [false, filePath];
    }
};

//resizing img using sharp
const resizeImg = async (
    imagePath: string,
    width: number,
    height: number,
    destinationPath: string
): Promise<boolean> => {
    try {
        await sharp(imagePath)
            .resize(width, height)
            .toFile(destinationPath)
            .then(() => {
                console.log("Image resized successfully.");
            });
        return true;
    } catch (err) {
        return false;
    }
};

export { thumbExists, requestValidator, checkFile, resizeImg };
