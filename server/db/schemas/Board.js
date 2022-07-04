import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoardScheme = new Schema({
    name: String,
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Board = mongoose.model('Board', BoardScheme);

export default Board;