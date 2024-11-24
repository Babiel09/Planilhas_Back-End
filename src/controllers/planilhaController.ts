import { FastifyReply, FastifyRequest } from "fastify";
import { 
    UpdateOnePlan, 
    ShowOnePlan, 
    InsertNewPlan, 
    ShowAllPlanilhas, 
    DeletePlan, 
    BuscadorNome, 
    BuscadorBairro, 
    BuscadorLocal, 
    UpdateContao, 
    UpdateLocal, 
    UpdateNome, 
    UpdateTipo 
} from "../services/planilhasService";
import { ClanEnum } from "@prisma/client";

export abstract class planilhaController {
    static async getAll(req: FastifyRequest, reply: FastifyReply) {

        const show = new ShowAllPlanilhas();

        try {
            const allPlans = await show.execute(); //qui eu tô usando o service do Prisma
           

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
            const { nome, bairro, local, numero, tipo, contato } = req.body as {
                nome: string,
                bairro: string,
                local: string,
                contato:string,
                numero: Number,
                tipo:ClanEnum
            };

            if(!nome || !bairro || !local ||!numero || !tipo || !contato){
                throw new Error("Você esqueceu de adicionar um elemento no método POST");
            };

            const newPlan = await insert.execute({ nome, bairro, local, numero, tipo, contato });
            reply.status(201).send(newPlan);
        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the POST Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async patchNome(req: FastifyRequest, reply: FastifyReply){
        const nomezao = new UpdateNome();
        try{
            const {id} = req.params as {id:string};
            const {nome} = req.body as {nome:string};


            if(!id){
                throw new Error("o id não foi encontrado, por favor verifique os parâmetros da requisição");
            };

            if(!nome){
                throw new Error("Você precisa passar o nome")
            }

            const updatedNome = await nomezao.execute({id, nome});
            reply.status(202).send(updatedNome);
        }catch (err) {
            reply.status(400).send({ server: `Unxpected error in the PATCH Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async patchLocal(req: FastifyRequest, reply: FastifyReply) {
        const localzao = new UpdateLocal();
        try{

            const {id} = req.params as {id:string};
            const {local} = req.body as {local:string};

            const updatedLocal = await localzao.execute({id, local});
            reply.status(202).send(updatedLocal);

        }catch (err) {
            reply.status(400).send({ server: `Unxpected error in the PATCH Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    };

    static async patchContato(req: FastifyRequest, reply: FastifyReply) {
        const contazao = new UpdateContao();
        try{
            const {id} = req.params as {id:string};
            const {contato} = req.body as {contato:string};

            if(!id){
                throw new Error(`O id fornecido: ${id}, é invalido, por favor verifique os parâmetros da requisição.`);
            };

            if(!contato){
                throw new Error(`Você precisa fornecer o contato para progedir`);
            };

            const updatedContato = await contazao.execute({id,contato});
            reply.status(202).send(updatedContato);

        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the PATCH Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    }
    static async patchTipo(req: FastifyRequest, reply: FastifyReply) {
        const tipozao = new UpdateTipo();
        try{
            const {id} = req.params as {id:string};
            const {tipo} = req.body as {tipo:ClanEnum};

            if(!id){
                throw new Error(`O id fornecido: ${id}, é invalido, por favor verifique os parâmetros da requisição.`);
            };

            if(!tipo){
                throw new Error(`Você precisa fornecer o tipo para progedir`);
            };

            const updatedContato = await tipozao.execute({id,tipo});
            reply.status(202).send(updatedContato);

        } catch (err) {
            reply.status(400).send({ server: `Unxpected error in the PATCH Method, check the error in console and here: ${err}` });
            console.log(err);
        };
    }


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