import Express, { type RequestHandler } from "express";
import passport from "passport";

export const googleAuthRoutes = Express.Router();

googleAuthRoutes.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }) as RequestHandler,
);

googleAuthRoutes.get(
    "/callback",
    passport.authenticate("google", {}) as RequestHandler,
);
