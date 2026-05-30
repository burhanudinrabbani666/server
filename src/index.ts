import { MongoStore } from "connect-mongo";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import "dotenv/config";

// index.ts - paling atas
import { MONGO_DB_URI, PORT, SESSION_SECRET } from "#config/key.js";
import { googleAuthRoutes } from "#routes/auth.route.js";
import { apiRoutes } from "#routes/root.routes.js";
import { googleStrategy } from "#service/google-verify.js";
import "#service/passport.session.js";

console.log(PORT);
console.log(MONGO_DB_URI);
console.log(SESSION_SECRET);

const app = express();
await mongoose.connect(MONGO_DB_URI, {
    dbName: "emily_nodejs",
});
passport.use(googleStrategy);

app.use(express.json());

/**
 * Set Cookie Session
 */
app.use(
    session({
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        store: MongoStore.create({
            collectionName: "sessions",
            dbName: "emily_nodejs",
            mongoUrl: MONGO_DB_URI,
            ttl: 60 * 60 * 24 * 7,
        }),
    }),
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Paths
 */
app.use("/api", apiRoutes);
app.use("/auth/google", googleAuthRoutes);

app.listen(PORT, () => {
    console.log(`This app running in http://localhost:${PORT}`);
});
