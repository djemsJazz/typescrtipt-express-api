/* eslint-disable no-console */
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import Controller from './interfaces/controller.interface';
import errorMidelware from './midelwares/error.midelware';

class App {
  public app: Application;

  public port: number;

  public listen() {
    this.app.listen(this.port, () => {
      console.log('App listening on port', this.port);
    });
  }

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToDb();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  private initializeMiddlewares = (): void => {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  };

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  private initializeErrorHandler = (): void => {
    this.app.use(errorMidelware);
  };

  private connectToDb = () => {
    const { LOCAL_CNX_STR } = process.env;
    mongoose.connect(LOCAL_CNX_STR!, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('open', () => { console.log('Database connected:'); });
    db.on('error', (error) => { console.error('connection error:', error); });
  };
}

export default App;
