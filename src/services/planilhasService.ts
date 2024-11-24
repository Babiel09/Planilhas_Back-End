import { ClanEnum, PrismaClient } from "@prisma/client";


const prismaClient = new PrismaClient();

interface PostDelete {
    id: string
};

interface NomeProps{
    id: string
    nome:string
}
interface BairroProps{
    id: string
    bairro: string

}
interface LocalProps{
    id: string
    local: string
}
interface ContatoProps{
    id: string
    contato: string
}
interface NumeroProps{
    id: string
    numero: Number
}
interface TipoProps{
    id: string
    tipo: ClanEnum
}




interface Post{
    nome: string
    bairro: string
    local: string
    contato: string
    numero: Number
    tipo: ClanEnum
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
            const allPlan = await prismaClient.plan.findMany(); //O erro tá aqui, mas eu não sei o motivo
            return allPlan;
        } catch (err) {
            throw new Error(`Ocorreu um problema para pegar todas as planilhas no DB: ${err}`);
        };
    }; 
}; //Quando eu faço o post funciona se liga

export class InsertNewPlan{
    async execute({nome, bairro, local, contato, numero, tipo}:Post){

        try {
            const newPlan = await prismaClient.plan.create({
                data:{
                    nome:nome,
                    bairro: bairro,
                    local: local,
                    contato: contato,
                    numero: numero,
                    tipo: tipo
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


export class UpdateNome{
    async execute({id,nome}:NomeProps){
        try{
            const findedId = await prismaClient.plan.findFirst({
                where:{
                    id: id
                }
            });

            if(!findedId){
                throw new Error("Não achamos o id");
            };

            const planUpdated = await prismaClient.plan.update({
                where:{
                    id:findedId?.id
                    
                },
                data:{
                    nome:nome
                }
            });

            return planUpdated;

        } catch(err){
            throw new Error(`Ocorreu um problema para editar o nome no DB: ${err}`);
        };
    };
};

export class UpdateLocal{
    async execute({id,local}:LocalProps) {
        try{
            const findedId = await prismaClient.plan.findFirst({
                where:{
                    id:id
                }
            });
        
            if(!findedId) {
                throw new Error("Não achamos o id");
            };



            const updateLocal = await prismaClient.plan.update({
                where:{
                    id:findedId.id
                },
                data:{
                    local:local
                }
            });

            return updateLocal;
        } catch(err) {
            throw new Error(`Ocorreu um problema para editar o local no DB: ${err}`);
        };
    };
};

export class UpdateContao{
    async execute({id,contato}:ContatoProps){
        try{

            const findedId = await prismaClient.plan.findFirst({
                where:{
                    id:id
                }
            });

            if(!findedId){
                throw new Error("Não achamos o id");
            };

            const updateContao = await prismaClient.plan.update({
                where:{
                    id:findedId.id
                },
                data:{
                    contato:contato
                }
            });

            return updateContao;


        } catch(err) {
            throw new Error(`Ocorreu um problema para editar o local no DB: ${err}`);
        };
    };
};
export class UpdateTipo{
    async execute({id,tipo}:TipoProps){
        try{

            const findedId = await prismaClient.plan.findFirst({
                where:{
                    id:id
                }
            });

            if(!findedId){
                throw new Error("Não achamos o id");
            };

            const updateContao = await prismaClient.plan.update({
                where:{
                    id:findedId.id
                },
                data:{
                    tipo:tipo
                }
            });

            return updateContao;


        } catch(err) {
            throw new Error(`Ocorreu um problema para editar o local no DB: ${err}`);
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