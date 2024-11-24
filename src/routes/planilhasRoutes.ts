import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { planilhaController } from "../controllers/planilhaController";

export const planilhasRoutes = async(fastify:FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get("/", planilhaController.getAll);
    fastify.get("/buscaNome", planilhaController.buscarPlanilhaNome);
    fastify.get("/buscaLocal", planilhaController.buscarPlanilhaLocal);
    fastify.get("/buscaBairro", planilhaController.buscaPlanilhaBairro);
    fastify.post("/", planilhaController.postPlan);
    fastify.delete("/:id", planilhaController.deltePlansFromDB);
    fastify.put("/:id", planilhaController.putPlan);
    fastify.get("/:id", planilhaController.getOnePlan);
};