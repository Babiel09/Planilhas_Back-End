import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { planilhaController } from "../controllers/planilhaController";

export const planilhasRoutes = async(fastify:FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get("/", planilhaController.getAll);
    fastify.get("/buscaNome", planilhaController.buscarPlanilhaNome);
    fastify.get("/buscaLocal", planilhaController.buscarPlanilhaLocal);
    fastify.get("/buscaBairro", planilhaController.buscaPlanilhaBairro);
    fastify.post("/", planilhaController.postPlan);
    fastify.patch("/:id/nome", planilhaController.patchNome);
    fastify.patch("/:id/local", planilhaController.patchLocal);
    fastify.patch("/:id/tipo", planilhaController.patchTipo);
    fastify.patch("/:id/contato", planilhaController.patchContato);
    fastify.delete("/:id", planilhaController.deltePlansFromDB);
    fastify.put("/:id", planilhaController.putPlan);
    fastify.get("/:id", planilhaController.getOnePlan);
};