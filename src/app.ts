/* eslint-disable no-console */
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

import loggerMidelware from './midelwares/logger';
import Controller from './interfaces/controller.interface';

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
  }

  private initializeMiddlewares = (): void => {
    this.app.use(bodyParser.json());
    this.app.use(loggerMidelware);
  };

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToDb = () => {
    const { LOCAL_CNX_STR } = process.env;
    mongoose.connect(LOCAL_CNX_STR!, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('open', () => { console.log('Database connected:'); });
    db.on('error', (error) => { console.error('connection error:', error); });
  };
}

export default App;
