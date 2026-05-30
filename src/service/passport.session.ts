import mongoose from "mongoose";
import passport from "passport";

import { User } from "#models/user.js";

/**
 * Set mongoDB document to request.user
 */
passport.serializeUser((u, done) => {
    done(null, (u as Express.User & { _id: string })._id);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
        return;
    } catch (error) {
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            console.log(error.cause);
        }
        done(null);
        return;
    }
});
