import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
// import authUser from'./routes/authRoutes'
import userRouters from "./routes/userRoutes.js"
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

// const db = { users: new Map() };
// const rpName = process.env.RP_NAME;
// const rpID = process.env.RP_ID;
// const origin = process.env.ORIGIN;

// test cảm biến window hello
// app.use('api/auth/',authUser)
app.use("/api/users",userRouters)
testConnection()

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`)
);
