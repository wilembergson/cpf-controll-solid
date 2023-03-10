import express, { json } from "express"
import "express-async-errors"
import cors from "cors"
import  serverRouter from "./core/infra/routes/sever.router"

const expressApp = express()

expressApp.use(json())
expressApp.use(cors())

expressApp.use(serverRouter)

export default expressApp

/*import "dotenv/config";
import * as express from "express";
import "express-async-errors";
import cors from "cors";

import { ServerRouter } from "./core/infra/routes/sever.router";

export class ExpressApp {
  private readonly _app: express.Application;
  private readonly _serverRouter: express.Router;

  constructor() {
    this._serverRouter = new ServerRouter().expressRouter;
    this._app = express.default();

    this.configMiddlewares();
  }

  public get app(): express.Application {
    return this._app;
  }

  protected configMiddlewares(): void {
    this._app.use(cors());
    this._app.use(express.json());

    this._app.use(this._serverRouter);
  }

  public async init(): Promise<void> {
    const { PORT } = process.env;

    this._app.listen(PORT || 5000, () => {
      console.log(`Running on [PORT::${PORT || 5000}]`);
    });
  }
}*/
