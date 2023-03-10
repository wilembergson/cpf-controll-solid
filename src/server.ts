import expressApp from "./express-app"
import dotenv from "dotenv"

const PORT = process.env.PORT
dotenv.config()

expressApp.listen(PORT, ()=> console.log(`Running on port ${PORT}...`))