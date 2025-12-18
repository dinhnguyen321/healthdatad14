import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import userRouters from "./routes/userRoutes.js"
import LoginRouters from "./routes/loginRoutes.js"
import { testConnection } from './routes/testConnection.js';
dotenv.config();

const app = express();
const allowedOrigins = [process.env.ORIGIN, process.env.VERCEL_URL];
app.use(express.json());
app.use(cors({
   origin: function (origin, callback) {
    // Cho phép các request không có origin (như Postman hoặc Mobile app) 
    // hoặc origin nằm trong danh sách trắng
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Chặn bởi CORS: Origin này không được phép!'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true 
  }));
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
