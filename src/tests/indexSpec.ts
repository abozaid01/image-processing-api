import app from "../index";
import supertest from "supertest";

const request = supertest(app);

const fileName = "fjord";
const width = 200;
const height = 200;

describe("Image Processing API Test Suite", () => {
    it("Perform GET / without any query parameters", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/api");
        expect(response.status).toBe(200);
    });

    it("Perform image resize successfully", async (): Promise<void> => {
        const response: supertest.Response = await request.get(
            `/api?fileName=${fileName}&width=${width}&height=${height}`
        );
        expect(response.status).toBe(200);
    });

    it("Perform GET / with missing query parameter", async (): Promise<void> => {
        const response: supertest.Response = await request.get(
            `/api?fileName=${fileName}&width=${width}`
        );
        expect(response.status).toBe(400);
    });
});
