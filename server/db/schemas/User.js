import mongoose from "mongoose";
import {passwordEncrypt} from "../../routes/middleware/passwordEncrypt.js";
const Schema = mongoose.Schema;

const UserScheme = new Schema({
    login: String,
    password: String,
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    permissions: Object
});

UserScheme.pre('save', function(next) {
    const user = this;

    passwordEncrypt(next, user);
});

UserScheme.pre('findByIdAndUpdate', function(next){
    const user = this;

    passwordEncrypt(next, user);
});

const User = mongoose.model('User', UserScheme);

export default User;
