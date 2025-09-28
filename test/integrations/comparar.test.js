import request from "supertest";
import app from "../setup.js";

describe("POST /api/comparar", () => {
  it("deve retornar comparações entre dois bairros e distâncias", async () => {
    const payload = {
      origem: { numero: "100", cep: "60160150" },
      destino: { numero: "200", cep: "60175230" },
      localDeInteresse: { numero: "50", cep: "60810100" }
    };

    const res = await request(app).post("/api/comparar").send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body).toHaveProperty("resultadosComparacao");
    expect(res.body.body).toHaveProperty("distanciasERotas");
  }, 10000);
})


