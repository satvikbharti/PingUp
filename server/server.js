import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import {inngest, functions} from './inngest/index.js'
import {serve} from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRotes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();

await connectDB();

const allowedOrigins = [
  'https://pingup-server-6v04nh008-satviks-projects-f6a94261.vercel.app',
  'http://localhost:5173',
  'http://localhost:4000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const sanitizedOrigin = origin.toLowerCase();
    if (
      allowedOrigins.includes(sanitizedOrigin) ||
      sanitizedOrigin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(clerkMiddleware());

app.get('/', (req, res)=> res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))