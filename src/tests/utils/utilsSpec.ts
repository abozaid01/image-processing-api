import supertest from "supertest";
import { resizeImg } from "../../utils/utils";

const fileName = "fjord";
const width = 200;
const height = 200;

describe("Image Resize Function", async (): Promise<void> => {
    const fullPath = "./assets/full";
    const thumbPath = "./assets/thumb";
    it("Trying out existing image file to check funcitonality", async (): Promise<void> => {
        const success = await resizeImg(
            `${fullPath}/${fileName}.jpg`,
            width,
            height,
            `${thumbPath}/${fileName}_${width}_${height}.jpg`
        );
        expect(success).toBe(true);
    }),
        it("passing huge parameters to make sure function catches erros.", async (): Promise<void> => {
            const success = await resizeImg(
                `${fullPath}/hello.jpg`,
                width,
                height,
                `${thumbPath}/hello_${width}_${height}.jpg`
            );
            expect(success).toBe(false);
        });
});
