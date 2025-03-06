import express, { RequestHandler } from "express";
import userRoutes from "./src/routes/users";
import addressRoutes from "./src/routes/address";
import postRoutes from "./src/routes/post";


const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(addressRoutes)
app.use(postRoutes)


const getHome: RequestHandler = (req, res) => {
    res.send('home')
}


app.get('/', getHome)


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server is live on port ${PORT}`);

        })
    } catch (error) {
        console.log(error);
    }
}

start()