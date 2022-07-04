import {User} from "../schemas/index.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

// get config vars
dotenv.config();

export const generateAccessToken = (login) => jwt.sign({login}, process.env.TOKEN_SECRET, {expiresIn: '86400s'});

export const createUser = (login, password) => {
    const newUser = new User({
        login: login,
        password: password,
        boards: [],
        permissions: {}
    });
    return newUser.save()
}

export const getBoardUsersPermissions = (boardId) => User.find({boards: boardId},[`permissions.${boardId}`, 'login']).exec()

export const findManyUsersByLogin = (queryString) => User.find({login: {$regex: queryString, $options: 'i'}}, 'login').exec();

export const findUserByLogin = (user) => User.findOne({login: user.login}).populate('boards').exec();

export const findUserHasBoardId = (userId, boardId) => User.findOne({_id:userId, boards: boardId}).populate('boards').exec()

export const updateLogin = (userId, login) => User.findByIdAndUpdate(userId, {login: login}, {new: true}).exec()

export const updatePassword = (userId, password) => User.findByIdAndUpdate(userId, {password: password}, {new: true}).exec();

export const deleteUser = (userId) => User.findByIdAndDelete(userId).exec();

export const addUserBoard = (userId, boardId) => User.findByIdAndUpdate(userId, {$push: {boards: boardId}}, {new: true});

export const findUserBoards = (userId) => User.findById(userId, 'boards').populate('boards').exec();

export const setDefaultCreatorPermissions = (userId, boardId) => User.findByIdAndUpdate(userId, {$set: {[`permissions.${boardId}`]: {canEdit: true, canInvite: true}}}).exec();

export const setDefaultUserPermissions = (userId, boardId) => User.findByIdAndUpdate(userId, {$set: {[`permissions.${boardId}`]: {canEdit: false, canInvite: false}}});

export const addPermission = (userId, boardId, permissionName) => User.findByIdAndUpdate(userId, {$set: {permissions:{boardId: {permissionName: true}}}}, {new:true}).exec()

export const changePermission = (userId, boardId, permissionName, permissionValue) => User.findByIdAndUpdate(userId, {$set: {[`permissions.${boardId}.${permissionName}`]: permissionValue}}, {new: true, projection: '-password'}).exec();

export const deleteBoardPermissions = (userId, boardId) => User.findByIdAndUpdate(userId, {$unset: {[`permissions.${boardId}`]: ""}})