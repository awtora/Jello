import {
    listAddRef,
    createList,
    deleteList,
    listDeleteRef, findAllLists,
    findManyLists,
    listMoveRef,
    updateListTitle, deleteListFromBoard
} from "../db/controllers/index.js";
import {authenticateToken} from "./middleware/authHelper.js";
import {addListToBoard} from "../db/controllers/index.js";

export default (app) => {
    app.get('/lists', authenticateToken, (req, res) => {
        //console.log(req.query);
        findManyLists(req.query.listIds).then((lists) => {
            console.log(lists)
            res.send({lists})
        });
    });

    app.post('/lists', authenticateToken, (req, res) => {
        console.log(req.body.data.boardId);
        createList(req.body.data.list).then(list => {
            addListToBoard(req.body.data.boardId, list._id).then(() => res.send({list}))
        });
    });

    app.put('/lists/move', authenticateToken, (req, res) => {
        listMoveRef(...req.body.data).then((list) => {
            res.send({list})
        });
    });

    app.put('/lists/title', authenticateToken, (req, res) => {
        updateListTitle(...req.body.data).then((list) => res.send({list}))
    })

    app.put('/lists/items', authenticateToken, (req, res) => {
        listAddRef(...req.body.data).populate('items').exec().then(list => res.send({list}))
    })

    app.delete('/lists/items', authenticateToken, (req, res) => {
        //console.log(req.body);
        listDeleteRef(...req.body).populate('items').exec().then(list => res.send({list}))
    })

    app.delete('/lists', authenticateToken, (req, res) => {
        console.log(req.body)
        deleteList(req.body.listId).then((list) => {
            deleteListFromBoard(req.body.boardId, list._id)
            //req.io.emit(`board ${req.body.data.boardId}`);
            res.send({list})
        });
    });
}