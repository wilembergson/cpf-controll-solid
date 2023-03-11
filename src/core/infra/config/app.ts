import express, { json } from "express"
import "express-async-errors"
import cors from "cors"
import serverRouter from "../routes/sever.router"

const app = express()

app.use(json())
app.use(cors())

app.use(serverRouter)

export default app