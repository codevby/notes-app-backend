import { Router } from 'express';

import { validateID } from '../../middlewares/validateID.middleware';
import { ProjectController } from './infraestructure/project.controller';

const projectRouter = Router();

projectRouter

    .get('/', ProjectController.getAllProjects)
    .get('/:id', validateID(), ProjectController.getProjectById)
    .get('/by-user/:userID', validateID(), ProjectController.getProjectsByUser)

    .post('/:userID', ProjectController.createProject)

    .put('/:id', validateID(),ProjectController.updateProject)
    
    .delete('/:id', validateID(),ProjectController.deleteProject)

export const projectRouters = projectRouter;