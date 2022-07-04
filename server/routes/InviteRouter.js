import {authenticateToken} from "./middleware/authHelper.js";
import {
    addUserBoard,
    createInvite,
    deleteInvite,
    findUserHasBoardId,
    findUserInvites,
    setDefaultUserPermissions
} from "../db/controllers/index.js";

export default (app) => {
    app.get('/invites', authenticateToken, (req, res) => {
        findUserInvites(req.query.userId).then(invites => res.send({invites}))
    })

    app.post('/invites', authenticateToken, (req, res) => {
        const invite = req.body.data;
        let userAlreadyOnBoard;
        findUserHasBoardId(invite.userToId, invite.boardTo.id).then(result => userAlreadyOnBoard = result)
        if (!userAlreadyOnBoard) {
            createInvite(invite).then(newInvite => res.send(newInvite))
        } else {
            res.status(400).send({message: 'The user you are trying to invite is already present on this board'})
        }
    })

    app.post('/invites/accept', authenticateToken, (req, res) => {
        addUserBoard(req.body.data.userId, req.body.data.boardId).populate('boards').exec().then(user => {
            setDefaultUserPermissions(req.body.data.userId, req.body.data.boardId)
                .then(() => deleteInvite(req.body.data.inviteId)
                    .then(() => res.send({boards: user.boards})))
        })
    })

    app.delete('/invites', authenticateToken, (req, res) => {
        deleteInvite(req.body.inviteId).then(invite => res.send({invite}))
    })
}