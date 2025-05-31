import { Router } from 'express';

import { validateID } from '../../middlewares/validateID.middleware';
import { ProyectController } from './infraestructure/project.controller';

const projectRouter = Router();

projectRouter

    .get('/', ProyectController.getAllProyects)
    .get('/:id', validateID(), ProyectController.getProyectById)
    .get('/by-user/:userID', validateID(), ProyectController.getProyectsByUser)
    .post('/:userID', ProyectController.createProyect)
    .put('/:id', validateID(),ProyectController.updateProyect)
    .delete('/:id', validateID(),ProyectController.deleteProyect)

export const projectRouters = projectRouter;