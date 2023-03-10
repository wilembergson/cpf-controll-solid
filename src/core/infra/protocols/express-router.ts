import * as express from "express";

/**
 * @class
 * @property {express.Router} expressRouter
 */
export abstract class ExpressRouter {
  public readonly expressRouter: express.Router;

  constructor() {
    this.expressRouter = express.Router();

    this.configRouter();
  }

  protected abstract configRouter(): void;
}
