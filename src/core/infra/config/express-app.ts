import express from "express";
import "express-async-errors"
import cors from "cors"
import serverRouter from "../routes/sever.router"

export class ExpressApp {
    private readonly app: express.Application
    private readonly router: express.Router

    constructor() {
        this.router = serverRouter
        this.app = express()
        this.configMiddlewares()
    }

    public get getInstance(): express.Application {
        this.configMiddlewares()
        return this.app;
    }

    protected configMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(this.router);
    }

    public async init(): Promise<void> {
        const { PORT } = process.env;
        this.app.listen(PORT || 5000, () => console.log(`Running on port ${PORT}...`))
      }
}

/*const app = express()

app.use(json())
app.use(cors())

app.use(serverRouter)

export default app*/