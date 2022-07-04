import {List} from '../schemas/index.js';
import {addListToBoard} from "./BoardController.js";

export const findOneList = (id) => List.findById(id).populate('items').exec();

export const findManyLists = (idArray) => List.find({_id: {$in: idArray}}).populate('items').exec();

export const findAllLists = () => List.find({}).populate('items').exec();

export const listDeleteRef = (listId, itemId) =>
    List.findByIdAndUpdate(listId, {$pullAll: {items: [itemId]}}, {new: true});

export const listAddRef = (listId, itemId, itemIndex) => List.findByIdAndUpdate(listId, {$push: {items: {$each: [itemId], $position: itemIndex}}}, {new: true});

export const listMoveRef = (listId, itemId, itemIndex) => listDeleteRef(listId, itemId).exec().then(list => listAddRef(listId, itemId, itemIndex).populate('items').exec());

export const updateListTitle = (listId, title) => List.findByIdAndUpdate(listId, {
    title: title
}, {new: true}).populate('items').exec()

export const createList = (list) => {
    const newList = new List({
        title: list.title,
        items: [],
    });
    return newList.save();
};

export const deleteList = (listId) => List.findByIdAndDelete(listId).exec();
