import { Request, Response } from "express";

import { ProyectModel } from "../domain/project.model";
import { Project } from "../models/project.model";
import { NoteModel } from "../../Note/domain/note.model";

async function getAllProyects(req: Request, res: Response) {
    try{
        const proyects = await ProyectModel.find({});
        res.status(200).json(proyects);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getProyectById(req: Request, res: Response) {
    
    try{

        const proyect = await ProyectModel.findById(req.params.id);

        if(!proyect){
            res.status(404).json({message: 'Proyect not found'});
            return;
        }

        res.status(200).json(proyect);

    }catch(error){
        res.status(500).json(error);
    }
}

async function createProyect(req: Request, res: Response) {
    try{

        const reqProyect = req.body as Project;
        const notes = req.body.notes;
        const userID = req.params.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        if(!reqProyect.name){
            res.status(400).json({message: 'Proyect name are required'});
            return;
        }
        if(reqProyect.name.length < 1 || reqProyect.name.length > 100){
            res.status(400).json({message: 'Proyect name must be longer than 1 character and shorter than 100 characters'});
            return;
        }

        //Validar que cada nota exista en database
        for(const note of notes){
            const noteID = note;
            const noteExist = await NoteModel.findById(noteID);
            if(!noteExist){
                res.status(400).json({message: 'Note not found'});
                return;
            }
        }


        const finalProyect = {
            name: reqProyect.name,
            description: reqProyect.description,
            images: reqProyect.images,
            links: reqProyect.links,
            status: reqProyect.status,
            notes: notes,
            user: userID
        }
        
        const proyect = new ProyectModel(finalProyect);
        await proyect.save();
        res.status(201).json(proyect);

    }catch(error){

        res.status(500).json(error);

    }
}

async function getProyectsByUser(req: Request, res: Response) {
    try{
        const userID = req.query.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        const proyects = await ProyectModel.find({user: userID});

        if(proyects.length === 0){
            res.status(404).json({message: 'This user has no proyects'});
            return;
        }

        if(!proyects){
            res.status(404).json({message: 'Proyects not found'});
            return;
        }

        res.status(200).json(proyects);

    }catch(error){
        res.status(500).json(error);
    }
}

async function updateProyect(req: Request, res: Response) {
    try{

        const options = { runValidators: true, new: true };

        const proyect = await ProyectModel.findByIdAndUpdate(req.params.id, req.body, options);

        if(!proyect){
            res.status(404).json({message: 'Proyect not found'});
            return;
        }

        res.status(200).json(proyect);

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el proyecto', details: error });
    }
}

async function deleteProyect(req: Request, res: Response) {
    try{

        const proyect = await ProyectModel.findByIdAndUpdate(req.params.id, {status: false});

        if(!proyect){
            res.status(404).json({message: 'Proyect not found'});
            return;
        }

        res.status(200).json({
            msg: 'Proyect deleted successfully'
        });
    }catch(error){
        res.status(500).json(error);
    }
}

export const ProyectController = {
    getAllProyects,
    getProyectById,
    getProyectsByUser,
    createProyect,
    updateProyect,
    deleteProyect,
}