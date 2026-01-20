import express from 'express';
import props from './config/properties';
import db from './config/db';
import bodyParser from 'body-parser';
import clinicalRoutes from './routes';
import cors from 'cors';
import nodemon from 'nodemon';

db();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


var clinicalRouter = express.Router();
clinicalRoutes(clinicalRouter);
app.use('/clinicalsapi', clinicalRouter);

app.listen(props.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started on port ${props.PORT}`);
    }   
});
