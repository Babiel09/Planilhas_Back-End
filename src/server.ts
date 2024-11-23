import fastify  from "fastify";
import cors from '@fastify/cors';
import { router } from "./routes/router";
const app = fastify({logger:true});


const server = async  () => {
    await app.register(cors);
    await app.register(router);
    const port =  8000;
    try{
        app.listen({port});
        console.log(`Server is running on: http://localhost:${port}`);
    } catch(err) {
        console.log(`Unxpected error during the listening port: ${err}`);
    };
};

server();