import {createItem, deleteItem, updateItem} from "../db/controllers/index.js";
import {authenticateToken} from "./middleware/authHelper.js";

export default (app) => {
    app.post('/items', authenticateToken, (req, res) => {
        createItem(...req.body.data).then((list) => res.send({ list }));
    });

    app.put('/items', authenticateToken, (req, res) => {
        updateItem(...req.body.data).then((list) => res.send({ list }));
    });

    app.delete('/items', authenticateToken, (req, res) => {
        deleteItem(...req.body).then((list) => {
            res.send({ list });
        });
    });
}