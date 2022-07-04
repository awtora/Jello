import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InviteScheme = new Schema({
    userFromLogin: String,
    userToId: Schema.Types.ObjectId,
    boardTo: {
        id: Schema.Types.ObjectId,
        name: String
    }
});

const Invite = mongoose.model('Invite', InviteScheme)

export default Invite