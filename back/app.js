import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs-extra';
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
//add body-parser
app.use(bodyParser.json());

//add multer to upload files
const storage =  multer.diskStorage({
  destination: function (req, file , callback) {
    console.log(file)
    callback(null, './templates');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.substring(0,file.originalname.length-4) + '-' + Date.now()+".pdf");
  }
});
const upload = multer({ storage : storage }).array('userPhoto',2);


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

app.post('/api/doc',upload,function(req,res){
  //console.log(req)
  console.log(req.files)
  const oldPath = req.files[0].path
  let newPath = './templates/'+req.files[0].filename.substring(0,req.files[0].filename.length-4)
  fs.ensureDir(newPath)
  .then(() => {
    newPath = newPath+'/'+req.files[0].originalname;
    fs.move(oldPath,newPath)
    .then(() => {
      console.log(newPath)
      var pdfImage = new pdf.PDFImage(newPath);
      pdfImage.numberOfPages().then((n)=>{
        //рендерим картинки
        pdfImage.convertFile().then(function (newPath) {
          // [ /tmp/slide-0.png, /tmp/slide-1.png ]
          console.log(newPath)
        });
        //делаем красивую ссылку на картинку каждой страницы
        let pages = new Array(+n).fill(0).map( (v, page) => ({ url:`http://localhost:3001/${newPath.substring(2,newPath.length-4)}-${page}.png`}))
        console.log(n)
        console.log(pages)
        res.send({path: newPath, pages:pages});
      }).catch((err)=>{
        console.log(err);
      })
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => {
    console.error(err)
  })
});

app.listen(3001, function(){
  let pdfImage = new pdf.PDFImage('./templates/one/gramota.pdf');
  
  pdfImage.convertFile().then(function (imagePaths) {
    // [ /tmp/slide-0.png, /tmp/slide-1.png ]
    console.log(imagePaths)
  });
  console.log('Example app listening on port 3001!');
  
});

