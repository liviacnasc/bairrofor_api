import request from "supertest";
import app from "../setup.js";

describe("POST /api/calcular-distancia", () => {
  it("deve retornar a distância entre dois endereços", async () => {
    const payload = {
      origem: { numero: "100", cep: "60160150" },
      destino: { numero: "200", cep: "60175230" }
    };

    const res = await request(app).post("/api/calcular-distancia").send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body).toHaveProperty("carro.distance");
    expect(res.body.body).toHaveProperty("carro.duration");
    expect(res.body.body).toHaveProperty("pe.duration");
    expect(res.body.body).toHaveProperty("pe.duration");
  }, 10000);
});
