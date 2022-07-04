import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ListScheme = new Schema({
    title: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

const List = mongoose.model('List', ListScheme);

export default List;
