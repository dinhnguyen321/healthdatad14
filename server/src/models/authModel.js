import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import {isoUint8Array, isoBase64URL } from '@simplewebauthn/server/helpers'
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { Buffer } from "node:buffer"
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

const db = { users: new Map() };
const rpName = process.env.RP_NAME;
const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN;
let users = [
    { id: 1, name: 'Daniel', email: 'daniel@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' },
  ];

  exports.getAuthUsers = async(req, res) => {
    const username = 'demo'; // test cố định, bạn có thể thay form client gửi lên
    let user = db.users.get(username);
    if (!user) {
      user = { id: randomUUID(), username, credentials: [] };
      db.users.set(username, user);
    }
    
  const userIdBuffer  = isoUint8Array.fromUTF8String(user.id)
    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userIdBuffer,
      userName: username,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });
    req.session.challenge = options.challenge;
    res.json(options);
  };
  exports.postRegisterResponse =  async (req, res) => {
    
    const request = await req.body;
      console.log("request.body",isoBase64URL.fromBuffer(request.body.rawId));
      
    const expectedChallenge = await req.session.challenge;
    if (!expectedChallenge) {
      return res.status(400).json({ error: 'No challenge found in session.' });
    }
    try {
      const verification = await verifyRegistrationResponse({
        response: body,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        requireUserVerification:true
      });
      console.log("verification",verification);
      
      const { verified, registrationInfo } = verification;
  
      if (verified && registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = registrationInfo;
        const user = db.users.get("demo");
        if (!user) {
          throw new Error('User not found');
        }
        user.credentials.push({ 
          credentialID:Buffer.from(credentialID), 
          credentialPublicKey:Buffer.from(credentialPublicKey), 
          counter 
        });
        db.users.set('demo', user);
        console.log(`✅ Registered new credential for user: ${user}`);
      }
      res.json({ verified });
    } 
    catch (err) {
      console.error('❌ Registration verification failed:', err);
      res.status(400).json({ error: err.message });
    }
  };

  /**
 * Đăng nhập (Authenticate)
 */
  exports.getLogin = (req, res) => {
    const user = db.users.get('demo');
    if (!user) return res.status(404).send('User not found');
  
    const options = generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
      allowCredentials: user.credentials.map(c => ({
        id: c.credentialID,
        type: 'public-key',
      })),
    });
  
    req.session.challenge = options.challenge;
    res.json(options);
  };

  exports.postLoginResponse = async (req, res) => {
    const body = req.body;
    const expectedChallenge = req.session.challenge;
    const user = db.users.get('demo');
  
    try {
      const dbAuthenticator = user.credentials.find(c =>
        Buffer.compare(c.credentialID, Buffer.from(body.id, 'base64url')) === 0,
      );
  
      const verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: dbAuthenticator,
      });
  
      const { verified, authenticationInfo } = verification;
  
      if (verified) dbAuthenticator.counter = authenticationInfo.newCounter;
  
      res.json({ verified });
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: err.message });
    }
  };
  