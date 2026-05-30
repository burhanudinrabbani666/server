import Express from "express";
import { type Request, type Response } from "express";

export const apiRoutes = Express.Router();

apiRoutes.get("/whoami", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: "Is Unautorizhed" });
        return;
    }

    res.send({ user: req.user });
});

apiRoutes.get("/logout", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) throw new Error("Error Logut");

        res.redirect("/");
    });
});
