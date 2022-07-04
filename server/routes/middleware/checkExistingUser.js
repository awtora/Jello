import {User} from "../../db/schemas/index.js";

export const checkExistingUser = (req, res, next) => {
    User.findOne({login: req.body.data.login}).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Sorry, this login is already taken" });
            return;
        }

        next();
    })
}