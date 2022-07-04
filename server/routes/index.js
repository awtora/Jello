import ListRouter from "./ListRouter.js";
import ItemRouter from "./ItemRouter.js";
import UserRouter from "./UserRouter.js";
import BoardRouter from "./BoardRouter.js";
import InviteRouter from "./InviteRouter.js";
import express from "express";

const app = express();

ListRouter(app);
ItemRouter(app);
UserRouter(app);
BoardRouter(app);
InviteRouter(app);

export default app;