import { type Profile } from "passport";
import {
    Strategy as GoogleStrategy,
    type VerifyCallback,
} from "passport-google-oauth20";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "#config/key.js";
import { User } from "#models/user.js";

async function googleVerify(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
) {
    try {
        /**
         * done() is the way we call passport to otomaticlly
         * set request.user with the second parameter
         */
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            done(null, existingUser);
            return;
        }

        const newUser = new User({ googleId: profile.id });
        await newUser.save();

        done(null, newUser);
        return;
    } catch (err) {
        console.log(err);
        done(err);
        return;
    }
}

export const googleStrategy = new GoogleStrategy(
    {
        callbackURL: "https://server-unqs.onrender.com/auth/google/callback",
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    googleVerify,
);
