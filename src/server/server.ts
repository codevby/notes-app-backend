import express from 'express';
import cors from 'cors';

const {dbConnection} = require('../database/config.db');
import { api } from "../routes/index.routes";
import { createServer } from 'http';
import { validateID } from '../middlewares/validateID.middleware';

export class Server {

    private app: express.Express;
    private port: string;
    private server: any;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.port = process.env.PORT || '3000';

        this.dbConnection();
        this.middleware();
        this.routes();
    }

    private async dbConnection(){
        await dbConnection();
    };

    private middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("src/public"));
    };

    private routes(){
        this.app.use('/api', api);
    };

    public listen () {
        this.app.listen(
          process.env.PORT, () => { console.log('Server running on the port', process.env.PORT); }
        )
      }
}