import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateOnePlan, ShowOnePlan, InsertNewPlan, ShowAllPlanilhas, DeletePlan, BuscadorNome, BuscadorBairro, BuscadorLocal } from "../services/planilhasService";

export abstract class planilhaController {
    static async getAll(req: FastifyRequest, reply: FastifyReply) {

        const show = new ShowAllPlanilhas();

        try {
            const allPlans = await show.execute();

            if (!allPlans) {
                reply.status(500).send("server: we can't find any 'planilhas'");
            }

            reply.status(200).send(allPlans);

        } catch (err) {
            reply.status(500).send({ server: `Unxpected error in the GET Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async postPlan(req: FastifyRequest, reply: FastifyReply) {

        const insert = new InsertNewPlan();

        try {
            const { nome, bairro, local } = req.body as {
                nome: string,
                bairro: string,
                local: string
            };

            const newPlan = await insert.execute({ nome, bairro, local });
            reply.status(201).send(newPlan);
        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the POST Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async deltePlansFromDB(req: FastifyRequest, reply: FastifyReply) {

        const deleted = new DeletePlan();

        try {

            const id = req.params as { id: string };

            const planDeleted = await deleted.execute(id);

            reply.status(204).send(planDeleted);


        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the DELETE Method, check the error in console and here: ${err}` });
            console.log(err);
        };


    };

    static async getOnePlan(req: FastifyRequest, reply: FastifyReply) {

        const getSpecifiedPlan = new ShowOnePlan();

        try {
            const id = req.params as { id: string };
            const specified = await getSpecifiedPlan.execute(id);
            reply.status(200).send(specified);
        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the GET:ID Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async putPlan(req: FastifyRequest, reply: FastifyReply) {
        const updated = new UpdateOnePlan();

        try {
            const identifier = req.params as { id: string };
            const planData = req.body as { planData: { [key: string]: any } };

            const putedPlan = await updated.execute({
                id: identifier.id,
                data: planData
            });

            reply.status(202).send(putedPlan);

        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the GET:ID Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async buscarPlanilhaNome(req: FastifyRequest, reply: FastifyReply) {
        const procuraNome = new BuscadorNome();
        try {
            const { nome } = req.query as { nome: string };

            if(!nome) {
                reply.status(400).send({server:"Você esqueceu de adicionar o nome nos parâmetros de busca!"});    
            };

            const doTheBusca = await procuraNome.execute({nome});
            reply.status(200).send(doTheBusca);

        } catch (err) {
            reply.status(500).send({ server: `Unxpected error in the BUSCA Function, check the error in console and here: ${err}` });
            console.log(err);
        };

    };

    static async buscarPlanilhaLocal(req: FastifyRequest, reply: FastifyReply) {
        const procuraLocal = new BuscadorLocal();
        
        try{
            const {local} = req.query as {local:string};
            if(!local) {
                reply.status(400).send({server:"Você esqueceu de fornecer o local!"})
            };
            const doTheBusca2 = await procuraLocal.execute({local});
            reply.status(200).send(doTheBusca2);
        } catch(err){
            reply.status(500).send({ server: `Unxpected error in the BUSCA Function, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async buscaPlanilhaBairro(req: FastifyRequest, reply: FastifyReply) {
        const procuraBairro = new BuscadorBairro();

        try{
            const {bairro} = req.query as {bairro:string};
            if(!bairro){
                reply.status(400).send({server:"Você esqueceu de fornecer o bairro!"});    
            };
            const doTheBusca3 = await procuraBairro.execute({bairro});
            reply.status(200).send(doTheBusca3);
        } catch(err){
            reply.status(500).send({ server: `Unxpected error in the BUSCA Function, check the error in console and here: ${err}` });
            console.log(err);
        };
    };
};