import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';

import dotenv from "dotenv";
dotenv.config();
const PORT =process.env.PORT;
const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.get('/', (req, res) => {
res.send("welcome to API");
}
);

app.listen( PORT, async() =>
{
    console.log(`API is running on http://localhost:${PORT}`)
    await connectDB();
} )

app.use(errorMiddleware);

export default app;