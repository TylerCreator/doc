import express from 'express';

import fs from'fs';
import mongoose from 'mongoose';
import cors from 'cors';
import pdf from 'pdf-image';
import { TemplateSchema } from './data/models';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './data/schema'
import {mergePDF,createPDF} from './tools/renderPDF';
import {htmlToPDF} from './tools/toHTML';

let app = express();

//setting CORS
app.use(cors());

//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017');


//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Compile model from schema
const TemplateModel = mongoose.model('Template', TemplateSchema );

let tmplt = {
  name: 'test Document',
  width: '1240',
  height: '1754',
  pages: [{
    uri: './templates/one/gramota-0.png'
  }],
  uri: './templates/one/gramota.pdf',
  data:[
    {
      id: 1,
      label: "first",
      val: "String",
    },
    {
      id: 2,
      label: "second",
      val: "",
    },
  ],
  rects:[
    {
      id: '1',
      page: 1,
      style: 'position:absolute; left: 40mm ; top: 40mm; width: 50mm; height:20mm; border: 1px solid black',
    },
    {
      id: '2',
      page: 2,
      style: '',
    }
  ],
};

TemplateModel.create(tmplt, function (err, awesome_instance) {
  if (err) return console.log(err)
});

app.get('/', async function(req, res){
  console.log(fs.readdirSync('.'));
  let data = await db.models.template.find();
  console.log(data);
  htmlToPDF();
  mergePDF();
  
  res.send("Hello World");
});

app.get('/templates/', async function(req, res){
  console.log(db);
  console.log(db.models.template);
  let data = await db.models.template.find();
  console.log(data);
  //htmlToPDF(data.templates[0])
  res.send(data);
});

app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
  })),
);

app.listen(3001, function(){
  let pdfImage = new pdf.PDFImage('./templates/one/gramota.pdf');
  
  pdfImage.convertFile().then(function (imagePaths) {
    // [ /tmp/slide-0.png, /tmp/slide-1.png ]
    console.log(imagePaths)
  });
  console.log('Example app listening on port 3001!');
  
});

