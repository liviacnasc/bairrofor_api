import request from "supertest";
import app from "../setup.js";

describe("GET /api/pesquisar", () => {
  it("deve retornar informações do bairro pelo CEP", async () => {
    const res = await request(app).get("/api/pesquisar?cep=60160150");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body[0]).toHaveProperty("indicador");
  });
});
