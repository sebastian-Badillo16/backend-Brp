import express from 'express';
import cors from 'cors';
import dbConection from '../database/config.js';
import usuario from '../routes/usuario.js';
import dependencias from '../routes/dependencias.js'
import visitas from '../routes/visitas.js'
import fileUpload from 'express-fileupload';

class Server{
    constructor(){
        
        this.port= process.env.PORT

        this.app = express();

        this.conectarBD();

        this.middlewares();

        this.routes();
    }

    routes(){
      
        this.app.use('/api/usuario',  usuario);
        this.app.use('/api/visitas', visitas);
        this.app.use('/api/dependencias', dependencias);    

    }

    async conectarBD(){
      await dbConection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'tmp/',
            createParentPath:true
        })) 
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default {Server};



