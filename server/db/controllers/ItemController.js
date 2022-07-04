import { Item, List } from '../schemas/index.js';
import { listAddRef, listDeleteRef } from './ListController.js';

export const createItem = (listId, item) => {
    const dbItem = new Item({
        title: item.title,
        text: item.text,
    });
    return dbItem.save().then(() => listAddRef(listId, dbItem._id).populate('items'));
};

export const updateItem = (listId, itemId, item) =>
    Item.findByIdAndUpdate(itemId, item)
        .exec()
        .then(() => List.findById(listId).populate('items'));

export const deleteItem = (listId, itemId) =>
    Item.findByIdAndDelete(itemId)
        .exec()
        .then(() => listDeleteRef(listId, itemId).populate('items'));
