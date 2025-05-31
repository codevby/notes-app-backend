import { Router } from 'express';

import { UserController } from './infraestructure/user.controller';
import { validateID } from '../../middlewares/validateID.middleware';

const userRouter = Router();

userRouter

    .get('/', UserController.getAllUsers)
    .get('/:id', validateID(), UserController.getUserById)
    .post('/', UserController.createUser)
    .put('/:id', validateID(),UserController.updateUser)
    .delete('/:id', validateID(),UserController.deleteUser)

export const userRouters = userRouter;