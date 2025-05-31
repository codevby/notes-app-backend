import { Request, Response } from "express";

import { ProjectModel as ProjectModel } from "../domain/project.model";
import { Project } from "../models/project.model";
import { NoteModel } from "../../Note/domain/note.model";

async function getAllProjects(req: Request, res: Response) {
    try{
        const projects = await ProjectModel.find({});
        res.status(200).json(projects);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getProjectById(req: Request, res: Response) {
    
    try{

        const project = await ProjectModel.findById(req.params.id);

        if(!project){
            res.status(404).json({message: 'Project not found'});
            return;
        }

        res.status(200).json(project);

    }catch(error){
        res.status(500).json(error);
    }
}

async function createProject(req: Request, res: Response) {
    try{

        const reqProject = req.body as Project;
        const notes = req.body.notes;
        const userID = req.query.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        if(!reqProject.name){
            res.status(400).json({message: 'Project name are required'});
            return;
        }
        if(reqProject.name.length < 1 || reqProject.name.length > 100){
            res.status(400).json({message: 'Project name must be longer than 1 character and shorter than 100 characters'});
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


        const finalProject = {
            name: reqProject.name,
            description: reqProject.description,
            images: reqProject.images,
            links: reqProject.links,
            status: reqProject.status,
            notes: notes,
            user: userID
        }
        
        const project = new ProjectModel(finalProject);
        await project.save();
        res.status(201).json(project);

    }catch(error){

        res.status(500).json(error);

    }
}

async function getProjectsByUser(req: Request, res: Response) {
    try{
        const userID = req.query.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        const projects = await ProjectModel.find({user: userID});

        if(projects.length === 0){
            res.status(404).json({message: 'This user has no projects'});
            return;
        }

        if(!projects){
            res.status(404).json({message: 'Projects not found'});
            return;
        }

        res.status(200).json(projects);

    }catch(error){
        res.status(500).json(error);
    }
}

async function updateProject(req: Request, res: Response) {
    try{

        const options = { runValidators: true, new: true };

        const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, options);

        if(!project){
            res.status(404).json({message: 'Project not found'});
            return;
        }

        res.status(200).json(project);

    }catch(error){
        res.status(500).json({ error: 'Error updating the project', details: error });
    }
}

async function deleteProject(req: Request, res: Response) {
    try{

        const project = await ProjectModel.findByIdAndUpdate(req.params.id, {status: false});

        if(!project){
            res.status(404).json({message: 'Project not found'});
            return;
        }

        res.status(200).json({
            msg: 'Project deleted successfully'
        });
    }catch(error){
        res.status(500).json(error);
    }
}

export const ProjectController = {
    getAllProjects,
    getProjectById,
    getProjectsByUser,
    createProject,
    updateProject,
    deleteProject,
}