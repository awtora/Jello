import {authenticateToken} from "./middleware/authHelper.js";
import {createBoard, deleteBoard, findBoardLists, updateBoardName} from "../db/controllers/BoardController.js";
import {addUserBoard, findUserBoards, setDefaultCreatorPermissions} from "../db/controllers/index.js";

export default (app) => {
    app.get('/user/boards', authenticateToken, (req, res) => {
        findUserBoards(req.query.userId).then(result => {
            res.send({boards: result.boards})
        })
    });

    app.get('/board/lists', authenticateToken, (req, res) => {
        findBoardLists(req.query.boardId).then(query => {
            res.send(query.lists)
        })
    })

    app.post('/boards', authenticateToken, (req, res) => {
        createBoard(req.body.data.name, req.body.data.creatorId).then(board => {
            setDefaultCreatorPermissions(req.body.data.creatorId, board._id)
                .then(() => addUserBoard(req.body.data.creatorId, board._id).exec().then(() => res.send({board})))
        })
    })

    app.put('/board', authenticateToken, (req, res) => {
        updateBoardName(...req.body.data).then(board => res.send({board}))
    })

    app.delete('/board', authenticateToken, (req, res) => {
        deleteBoard(req.body.boardId).then(board => {
            res.send({board})
        })
    })
}