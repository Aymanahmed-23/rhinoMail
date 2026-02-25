import UserRouter from './routers/UserRouter.js';
import AuthRouter from './routers/AuthRouter.js';
import SubscriptionRouter from './routers/SubscriptionRouter.js';
import connectDB from '.databse/mongodb.js';


import Express from 'express';
const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
res.send("welcome to API");
}
);

app.listen( PORT, async() =>
{
    console.log('API is running on http://localhost:${PORT}')
    await connectDB();
} )

export default app;