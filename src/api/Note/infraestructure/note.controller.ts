import { Request, Response } from "express";

import { NoteModel } from "../domain/note.model";
import { Note } from "../models/note.model";

async function getAllNotes(req: Request, res: Response) {
    try{
        const notes = await NoteModel.find({});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getNoteById(req: Request, res: Response) {
    
    try{

        const note = await NoteModel.findById(req.params.id);

        if(!note){
            res.status(404).json({message: 'Note not found'});
            return;
        }

        res.status(200).json(note);

    }catch(error){
        res.status(500).json(error);
    }
}

async function createNote(req: Request, res: Response) {
    try{

        const reqNote = req.body as Note;
        const userID = req.params.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        if(!reqNote.title){
            res.status(400).json({message: 'Title are required'});
            return;
        }
        if(reqNote.title.length < 1 || reqNote.title.length > 100){
            res.status(400).json({message: 'Title and content must be longer than 1 character and shorter than 100 characters'});
            return;
        }

        const finalNote = {
            title: reqNote.title,
            content: reqNote.content,
            type: reqNote.type,
            user: userID
        }
        
        const note = new NoteModel(finalNote);
        await note.save();
        res.status(201).json(note);

    }catch(error){

        res.status(500).json(error);

    }
}

async function getNotesByUser(req: Request, res: Response) {
    try{
        const userID = req.query.userID;

        if(!userID){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        const notes = await NoteModel.find({user: userID});

        if(notes.length === 0){
            res.status(404).json({message: 'This user has no notes'});
            return;
        }

        if(!notes){
            res.status(404).json({message: 'Notes not found'});
            return;
        }

        res.status(200).json(notes);

    }catch(error){
        res.status(500).json(error);
    }
}

async function updateNote(req: Request, res: Response) {
    try{

        const options = { runValidators: true, new: true };

        const note = await NoteModel.findByIdAndUpdate(req.params.id, req.body, options);

        if(!note){
            res.status(404).json({message: 'Note not found'});
            return;
        }

        res.status(200).json(note);

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar la nota', details: error });
    }
}

async function deleteNote(req: Request, res: Response) {
    try{

        const note = await NoteModel.findByIdAndDelete(req.params.id);

        if(!note){
            res.status(404).json({message: 'Note not found'});
            return;
        }

        res.status(200).json({
            msg: 'Note deleted successfully'
        });
    }catch(error){
        res.status(500).json(error);
    }
}

async function createNotesBatch(req: Request, res: Response) { //TODO: Endpoint pending to TEST
    try {
        const { notes } = req.body as { notes: Note[] };
    
        if (!Array.isArray(notes) || notes.length === 0) {
          return res.status(400).json({ message: 'Array of notes is required' });
        }
    
        // Validar que cada nota tenga título y contenido (puedes hacer validaciones más estrictas)
        for (const note of notes) {
          if (!note.title || !note.content) {
            return res.status(400).json({ message: 'Each note must have a title and content' });
          }
        }
    
        // Insertar todas las notas de una vez
        const createdNotes = await NoteModel.insertMany(notes);
    
        res.status(201).json({ message: 'Notas creadas correctamente', data: createdNotes });
      } catch (error) {
        res.status(500).json({ message: 'Error al crear notas', error: error });
      }
}

export const NoteController = {
    getAllNotes,
    getNoteById,
    getNotesByUser,
    createNote,
    createNotesBatch,
    updateNote,
    deleteNote,
}