const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/app');
const cors = require('cors');


const db= 'mongodb://localhost/veterinaria';
const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

//Crear servidor

const app = express();

//Habilitar cors
const whiteList = ['http://localhost:3000', 'htpp://localhost:4000'];
const corsOptions = {
    origin: (origin,callback)=>{
        const existe = whiteList.some(dominio=> dominio === origin);
        if(existe){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

// app.use(cors(corsOptions));
app.use(cors());


//Conectar a mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(db,dbConfig);

//Habilitar body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Habilitar routin
app.use('/', routes());

//Puerto y arrancar servidor

const port = 4000;

app.listen(port,()=>{
    console.log(`Corriendo en el puerto ${port}`);
})