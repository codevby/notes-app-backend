import express from 'express';
import { noteRouters } from '../api/Note/note.router';

export const api = express.Router();

api.use('/notes', noteRouters);