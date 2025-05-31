import { Router } from 'express';

import { NoteController } from './infraestructure/note.controller';
import { validateID } from '../../middlewares/validateID.middleware';

const noteRouter = Router();

noteRouter

    .get('/', NoteController.getAllNotes)
    .get('/:id', validateID(), NoteController.getNoteById)
    .get('/by-user/:userID', validateID(), NoteController.getNotesByUser)
    .post('/:userID', NoteController.createNote)
    .put('/:id', validateID(),NoteController.updateNote)
    .delete('/:id', validateID(),NoteController.deleteNote)

export const noteRouters = noteRouter;