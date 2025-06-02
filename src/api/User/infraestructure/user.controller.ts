import { Request, Response } from "express";
import { UserModel } from "../domain/user.model";

const jwt = require('jsonwebtoken');

import bcrypt from "bcryptjs";
import { Token } from "../models/user.model";

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

    const { email, password } = req.body;

    try{

        const user = await UserModel.findOne({ email });
        if(user){
            res.status(400).json({message: 'User already exists'});
            return;
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const newUser = new UserModel({
            name: req.body.name,
            email,
            password: hashedPassword,
            status: true
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully'
        });

    } catch(error){
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

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try{

        const user = await UserModel.findOne({ email });
        if(!user){
            res.status(404).json({message: 'Invalid email or password'});
            return;
        }

        if(user.status === false){
            res.status(401).json({message: 'Invalid email or password'});
            return;
        }

        const validPassword = await bcrypt.compareSync(password, user.password);
        if(!validPassword){
            res.status(401).json({message: 'Invalid email or password'});
            return;
        }
        
        const token = jwt.sign(
            { payload: { username: user.name, userId: user._id, status: user.status } },
            process.env.JWT_SECRET,
          );

        res.status(200).json({
            user: user,
            messege: "Login successful",
            token
        });

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

async function tokenVerify(req: Request, res: Response) {
    try{
        
        const token: string = req.headers['access-token'] as string;

        if(!token || typeof token !== 'string'){
            res.status(401).json({message: 'No access-token provided'});
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

        const user = await UserModel.findOne({ username: decoded.username });
        
        if(!user){
            res.status(404).json({message: 'User not found'});
            return;
        }
        
        const newToken = jwt.sign(
            { username: user.name, userId: user._id, status: user.status },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );
        
        res.status(200).json({
            user: user,
            messege: "Session token updated",
            token: newToken
        });
    } catch(error){
        res.status(500).json(error);
    }
}

export const UserController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    tokenVerify
}

