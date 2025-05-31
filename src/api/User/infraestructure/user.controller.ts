import { Request, Response } from "express";
import { UserModel } from "../domain/user.model";
import { User } from "../models/user.model";

async function getAllUsers(req: Request, res: Response) {
    try{
        const users = await UserModel.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getUserById(req: Request, res: Response) {
    try{
        const user = await UserModel.findById(req.params.id);
        if(!user){
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }
}

async function createUser(req: Request, res: Response) {
    try{
        const reqUser = req.body as User;
        if(!reqUser.name){
            res.status(400).json({message: 'Name is required'});
            return;
        }
        if(!reqUser.email || !reqUser.password){
            res.status(400).json({message: 'Email and password are required'});
            return;
        }
        const user = new UserModel(reqUser);
        await user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json(error);
    }
}

async function updateUser(req: Request, res: Response) {
    try{
        const options = { runValidators: true, new: true };
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, options);
        if(!user){
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }
}

async function deleteUser(req: Request, res: Response) {
    try{
        const user = await UserModel.findByIdAndUpdate(req.params.id, {status: false}, {new: true});
        if(!user){
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json({
            msg: 'User deleted successfully'
        });
    }catch(error){
        res.status(500).json(error);
    }
}

export const UserController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

