import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemScheme = new Schema({
    title: String,
    text: String,
});

const Item = mongoose.model('Item', ItemScheme);

export default Item;
