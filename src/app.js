import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes';

class App{

  constructor(){
    this.server = express();

    mongoose.connect('mongodb://locacao:locacao@cluster0-shard-00-00.mxz88.mongodb.net:27017,cluster0-shard-00-01.mxz88.mongodb.net:27017,cluster0-shard-00-02.mxz88.mongodb.net:27017/locacao?ssl=true&replicaSet=atlas-9r7jsf-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }

}

export default new App().server;
