import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['x-access-token']

    if (!authHeader) return res.status(401).send({message: 'You are unauthorized'})

    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
        //console.log(err)

        if (err) return res.status(403).send({message:'Your token has expired. Please, re-login into the app'})

        req.user = user

        next()
    })
}

export const verifyPassword = (candidatePassword, userPassword) => bcrypt.compareSync(candidatePassword, userPassword);