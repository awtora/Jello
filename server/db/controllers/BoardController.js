import {Board} from "../schemas/index.js";

export const findOneBoardById = (id) => Board.findById(id).exec();

export const findManyBoardsByIds = ([idArray]) => Board.find({_id: {$in: idArray}}).exec();

export const createBoard = (name, userId) => {
    const newBoard = new Board({
        name: name,
        lists: [],
        creator: userId,
        admins: [],
        users: [],
    })
    return newBoard.save();
};

export const findBoardLists = (boardId) => Board.findById(boardId, 'lists').populate({path: 'lists', populate: 'items'}).exec();

export const updateBoardName = (boardId, name) => Board.findByIdAndUpdate(boardId, {name: name}, {new: true}).exec();

export const addBoardAdmin = (boardId, userId) => Board.findByIdAndUpdate(boardId, {$push: {admins: userId}}, {new: true}).exec();

export const deleteBoardAdmin = (boardId, userId) => Board.findByIdAndUpdate(boardId, {$pullAll: {admins: [userId]}}, {new: true}).exec();

export const addBoardUser = (boardId, userId) => Board.findByIdAndUpdate(boardId, {$push: {users: userId}}, {new: true}).exec();

export const deleteBoardUser = (boardId, userId) => Board.findByIdAndUpdate(boardId, {$pullAll: {users: [userId]}}, {new: true}).exec();

export const addListToBoard = (boardId, listId) => Board.findByIdAndUpdate(boardId, {$push: {lists: listId}}, {new: true}).exec();

export const deleteListFromBoard = (boardId, listId) => Board.findByIdAndUpdate(boardId, {$pullAll: {lists: [listId]}}, {new: true}).exec();

export const deleteBoard = (boardId) => Board.findByIdAndDelete(boardId).exec()