import { PrismaClient } from "@prisma/client";


const prismaClient = new PrismaClient();

interface PostDelete {
    id: string
};

interface Post{
    nome: string;
    bairro: string;
    local: string;
}

interface Put{
    id: string;
    data:{
        [key:string]:any
    }
}

interface GetPerid{
    id: string;
};

interface BuscaNomeProps{
    nome:string;

};
interface BuscaBairroProps{
    bairro:string;
    

};
interface BuscaLocalProps{
    local:string;
    

};


export class BuscadorNome{
    async execute({nome}:BuscaNomeProps) {
        try{
            const buscaNome = prismaClient.plan.findFirst({
                where:{
                    nome:nome
                }
            });
            return buscaNome;
        }catch (err) {
            throw new Error(`Ocorreu um problema para buscar certos elementos no DB: ${err}`);
        };
    };
};


export class BuscadorBairro{
    async execute({bairro}:BuscaBairroProps) {
        try{
            const buscaBairro = prismaClient.plan.findFirst({
                where:{
                    bairro:bairro
                }
            });
            return buscaBairro;
        }catch (err) {
            throw new Error(`Ocorreu um problema para buscar certos elementos no DB: ${err}`);
        };
    };
};

export class BuscadorLocal{
    async execute({local}:BuscaLocalProps) {
        try{
            const buscaLocal = prismaClient.plan.findFirst({
                where:{
                    local:local
                }
            });
            return buscaLocal;
        }catch (err) {
            throw new Error(`Ocorreu um problema para buscar certos elementos no DB: ${err}`);
        };
    };
};
export class ShowAllPlanilhas {
    async execute() {
        try {
            const allPlan = await prismaClient.plan.findMany();
            return allPlan;
        } catch (err) {
            throw new Error(`Ocorreu um problema para pegar todas as planilhas no DB: ${err}`);
        };
    };
};

export class InsertNewPlan{
    async execute({nome, bairro, local}:Post){

        try {
            const newPlan = await prismaClient.plan.create({
                data:{
                    nome:nome,
                    bairro: bairro,
                    local: local
                }
            });
            return {newPlan};
        } catch (err) {
            throw new Error(`Ocorreu um problema para inserir uma nova planilha no DB: ${err}`);
        }
    }
};

export class ShowOnePlan{
    async execute({id}:GetPerid){
        try{
            const findOnePlan = await prismaClient.plan.findFirst({
                where:{
                    id:id
                }
            });
            return findOnePlan;
        }catch (err) {
            throw new Error(`Ocorreu um problema para pegar uma planilha especifíca no DB: ${err}`);
        };
    };
};

export class UpdateOnePlan{
    async execute({id, data}:Put) {
        try{
            const findPlan = await prismaClient.plan.findFirst({
                where:{
                    id:id
                }
            });
            
            if(!findPlan) {
                throw new Error("A planilia que você deseja atualizar não existe, verifique os parâmetros da requisição.");
            };

            const updatePlan = await prismaClient.plan.update({
                where:{
                    id: findPlan.id
                },
                data: {...data}
            });

            return updatePlan;

        }catch (err) {
            throw new Error(`Ocorreu um problema para pegar uma planilha especifíca no DB: ${err}`);
        };
    };
};

export class DeletePlan{
    async execute({id}:PostDelete) {
        try{
            const findPlan = await prismaClient.plan.findFirst({
                where:{
                    id: id
                }
            });

            if(!findPlan) {
                throw new Error("A planilia que você deseja atualizar não existe, verifique os parâmetros da requisição.");
            };

             await prismaClient.plan.delete({
                where:{
                    id: findPlan.id
                }
            });

            return 

        } catch (err) {
            throw new Error(`Ocorreu um problema para deletar uma planilha especifíca no DB: ${err}`);
        };
    };
};