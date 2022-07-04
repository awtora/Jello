import {Invite} from '../schemas/index.js'

export const createInvite = (invite) => {
    const newInvite = new Invite({
        userFromLogin: invite.userFromLogin,
        userToId: invite.userToId,
        boardTo: {
            id: invite.boardTo.id,
            name: invite.boardTo.name,
        }
    })
    return newInvite.save();
}

export const findUserInvites = (userId) => Invite.find({userToId: userId}).exec();

export const deleteInvite = (inviteId) => Invite.findByIdAndDelete(inviteId).exec();