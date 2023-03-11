import dotenv from "dotenv"
import app from "./core/infra/config/app"

const PORT = process.env.PORT
dotenv.config()

app.listen(PORT, () => console.log(`Running on port ${PORT}...`))