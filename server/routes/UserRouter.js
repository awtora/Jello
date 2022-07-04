import {
    createUser,
    findUserByLogin,
    generateAccessToken,
    findManyUsersByLogin,
    updateLogin,
    updatePassword, getBoardUsersPermissions, changePermission
} from "../db/controllers/index.js";
import {authenticateToken, verifyPassword} from "./middleware/authHelper.js";
import {checkExistingUser} from "./middleware/checkExistingUser.js";

export default (app) => {
    app.get('/users/queryByName', authenticateToken, (req,res) => {
        findManyUsersByLogin(req.query.searchTerm).then(users => res.send({users}))
    })

    app.post('/user/signIn', (req, res) => {
        let token = generateAccessToken(req.body.data.login);
        findUserByLogin(req.body.data).then(user => {
            if (user) {
                if (verifyPassword(req.body.data.password, user.password)) {
                    res.send({user: {id: user._id, login: user.login, permissions: user.permissions , accessToken: token}, userBoards: user.boards})
                } else {
                    res.status(401).send({message: 'Wrong password'});
                }
            } else {
                res.status(404).send({message: "User not found"})
            }
        })
    })

    app.post('/user/signUp', checkExistingUser, (req, res) => {
        let token = generateAccessToken(req.body.data.login);
        createUser(req.body.data.login, req.body.data.password).then(user => res.send({user: {id: user._id, login: user.login, accessToken: token}, userBoards: user.boards}))
    })

    app.post('/user/editLogin', authenticateToken, checkExistingUser, (req,res) => {
        updateLogin(...req.body.data).then(user => res.send({user: {id: user._id, login: user.login, permissions: user.permissions , accessToken: req.headers[`x-access-token`]}, userBoards: user.boards}))
    })

    app.post('/user/editPassword', authenticateToken, (req, res) => {
        updatePassword(...req.body.data).then(() => res.status(200))
    })

    app.get('/users/boardPermissions', authenticateToken, (req, res) => {
        getBoardUsersPermissions(req.query.boardId).then(result => res.send({result}))
    })

    app.post('/users/boardPermissions', authenticateToken, (req, res) => {
        changePermission(...req.body.data).then(user => res.send({user: {id: user._id, login: user.login, permissions: user.permissions , accessToken: req.headers[`x-access-token`]}, userBoards: user.boards}))
    })
}