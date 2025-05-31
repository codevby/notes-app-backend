import express from 'express';
import { noteRouters } from '../api/Note/note.router';
import { userRouters } from '../api/User/user.router';
import { projectRouters } from '../api/Project/project.routes';

export const api = express.Router();

api.use('/notes', noteRouters);
api.use('/users', userRouters);
api.use('/projects', projectRouters);