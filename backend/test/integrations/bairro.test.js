import request from "supertest";
import app from "../setup.js";

describe("GET /api/bairro/:id", () => {
  it("deve retornar os dados de um bairro existente", async () => {
    const res = await request(app).get("/api/bairro/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body).toHaveProperty("nome");
  });

  it("deve retornar erro para bairro inexistente", async () => {
    const res = await request(app).get("/api/bairro/9999");

    expect(res.statusCode).toBe(404); // ajuste conforme seu erro
    expect(res.body.success).toBe(false);
  });
});
