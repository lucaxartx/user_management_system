import express, { RequestHandler } from "express";
import userRoutes from "./src/routes/users";
import addressRoutes from "./src/routes/address";
import postRoutes from "./src/routes/post";
import { errorHandler } from "./src/middleware/errorHandler";
import db from './src/db/connect';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(addressRoutes);
app.use(postRoutes);

app.use(errorHandler);

const getHome: RequestHandler = (req, res) => {
    res.send('home');
};

app.get('/', getHome);

const start = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`server is live on port ${PORT}`);
        });

        // Graceful shutdown
        const gracefulShutdown = async () => {
            console.log('Shutting down gracefully...');
            server.close(async () => {
                console.log('Closed out remaining connections');
                await db.$disconnect();
                console.log('Database connections closed.');
                process.exit(0);
            });

            setTimeout(() => {
                console.error('Couldn\'t close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        };


        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);


        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
            process.exit(1);
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            process.exit(1);
        });

    } catch (error) {
        console.log(error);
    }
};

start();


export default app;