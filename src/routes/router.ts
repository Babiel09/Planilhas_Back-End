import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { planilhasRoutes } from "./planilhasRoutes";

export const router = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.register(planilhasRoutes, {prefix:"/plan"});
};