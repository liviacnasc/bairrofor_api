import request from "supertest";
import app from "../setup.js";

describe("GET /api/localizar/numero/:numero/cep/:cep", () => {
  it("deve retornar coordenadas válidas", async () => {
    const res = await request(app).get("/api/localizar/numero/100/cep/60160150");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body).toHaveProperty("lat");
    expect(res.body.body).toHaveProperty("long");
  });
});