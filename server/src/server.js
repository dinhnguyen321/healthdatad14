import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import userRouters from "./routes/userRoutes.js"
import LoginRouters from "./routes/loginRoutes.js"
import { testConnection } from './routes/testConnection.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users",userRouters)
app.use("/account",LoginRouters)
testConnection()

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`)
);
