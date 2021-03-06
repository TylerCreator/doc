import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs-extra';
import mongoose from 'mongoose';
import cors from 'cors';
import pdf from 'pdf-image';
import expressGraphQL from 'express-graphql';
import { TemplateSchema } from './data/models';
import schema from './data/schema';
import { createPDF } from './tools/PDFgenerator';

const app = express();
// add body-parser
app.use(bodyParser.json());

// add multer to upload files

const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log(__dirname);
    callback(null, './templates');
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname.substring(0, file.originalname.length - 4)}-${Date.now()}.pdf`);
  },
});
const upload = multer({ storage }).array('userPhoto', 2);


// setting CORS
app.use(cors());

// Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017');


// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Compile model from schema
const TemplateModel = mongoose.model('Template', TemplateSchema);


async function createTemplate(t, _pages, path) {
  console.log(_pages);
  const tmp = {
    name: t.originalname.substring(0, t.originalname.length - 4),
    width: '1240',
    height: '1754',
    pages: _pages,
    uri: path,
    data: [
      {
        id: 0,
        label: 'Диплом *степени* вручается',
        val: '',
      },
      {
        id: 1,
        label: 'Кому вручается',
        val: '',
      },
      {
        id: 2,
        label: 'За что',
        val: '',
      },
      {
        id: 3,
        label: 'Должность',
        val: '',
      },
      {
        id: 4,
        label: 'Фамилия и инициалы',
        val: '',
      },
    ],
    rects: [
      {
        id: 0,
        page: 1,
        style: 'position:absolute; left: 30mm ; top: 120mm; width: 204mm; height:15mm; border: none; text-align:center; font-size:50px; vertical-align: text-top;',
      },
      {
        id: 1,
        page: 1,
        style: 'position:absolute; left: 30mm ; top: 150mm; width: 204mm; height:8mm; border: none; text-align:center; font-size:30px; vertical-align: text-top;',
      },
      {
        id: 2,
        page: 1,
        style: 'position:absolute; left: 30mm ; top: 170mm; width: 204mm; height:8mm; text-align:center; border: none; font-size:30px; vertical-align: text-top;',
      },
      {
        id: 3,
        page: 1,
        style: 'position:absolute; left: 15mm ; top: 280mm; width: 204mm; height:8mm; text-align:left; border: none; font-size:28px; vertical-align: text-top;',
      },
      {
        id: 4,
        page: 1,
        style: 'position:absolute; left: 15mm ; top: 290mm; width: 204mm; height:8mm; text-align:left; border: none; font-size:32px; vertical-align: text-top;',
      },
    ],
  };
  TemplateModel.create(tmp, (err) => {
    console.log(err);
  });
}

// TemplateModel.create(tmplt, function (err, awesome_instance) {
//   if (err) return console.log(err)
// });

app.get('/', async () => {
  console.log(fs.readdirSync('.'));
});

app.get('/templates/', async (res) => {
  console.log(db);
  console.log(db.models.template);
  const data = await db.models.template.find();
  console.log(data);
  res.send(data);
});

app.post('/download', (req, res) => {
  // var filename = req.params.id;
  // file = '/templates/result.pdf';
  // res.header('Content-disposition', 'inline; filename=' + "new");
  // res.header('Content-type', 'application/pdf');
  // fs.readFile(__dirname + file , function (err,data){
  //   res.contentType("application/pdf");
  //   res.send(data);
  // });
  // console.log(req.body);

  // TO SEND PDF
  // res.header('Content-disposition', 'inline; filename=new');
  // res.header('Content-type', 'application/pdf');
  // console.log(`${__dirname.substring(0, __dirname.length - 5)}/templates/result.pdf`);
  // res.sendFile(`${__dirname.substring(0, __dirname.length - 5)}/templates/result.pdf`);

  createPDF(req.body).then((data) => {
    res.send(`http://localhost:3001/${data.substring(2)}`);
    // res.redirect(`http://localhost:3001/${data.substring(2)}`);
  });
});

app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
  })),
);
// РАБОТА С ФАЙЛАМИ
// ЗАГРУЗКА ФАЙЛА В ПАПКУ
app.post('/api/doc', upload, (req, res) => {
  const BLUR_RATIO = 4;
  const oldPath = req.files[0].path;
  let newPath = `./templates/${req.files[0].filename.substring(0, req.files[0].filename.length - 4)}`;
  fs.ensureDir(newPath)
    .then(() => {
      newPath = `${newPath}/${req.files[0].originalname}`;
      fs.move(oldPath, newPath)
        .then(() => {
          const pdfImage = new pdf.PDFImage(newPath, {
            graphicsMagick: true,
            convertOptions: {
              '-density': `${72 * BLUR_RATIO}`,
              '-resize': `${Math.round(100 / BLUR_RATIO)}%`,
            },
          });
          pdfImage.numberOfPages().then((n) => {
            // рендерим картинки
            pdfImage.convertFile().then(() => {
              // [ /tmp/slide-0.png, /tmp/slide-1.png ]
            });
            // делаем красивую ссылку на картинку каждой страницы
            const pages = new Array(+n).fill(0).map((v, page) => ({ url: `http://localhost:3001/${newPath.substring(2, newPath.length - 4)}-${page}.png` }));
            createTemplate(req.files[0], pages, newPath).then(() => {
              res.send({ path: newPath, pages });
            });
          }).catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});
// ОТПРАВЛЕНИЕ СКРИНОВ СТРАНИЦ ПО ЗАПРОСУ
app.get(/(.*\.png)$/i, (req, res) => {
  const pdfPath = req.params[0];
  res.sendFile(`${__dirname.substring(0, __dirname.length - 5)}/${pdfPath}`);
  // res.sendFile(__dirname.substring(0,__dirname.length-5)+"templates/one/gramota.pdf");
});

app.get(/(.*\.pdf)$/i, (req, res) => {
  const pdfPath = req.params[0];
  res.header('Content-disposition', 'inline; filename=new');
  res.header('Content-type', 'application/pdf');
  res.sendFile(`${__dirname.substring(0, __dirname.length - 5)}/${pdfPath}`);

  // res.sendFile(__dirname.substring(0,__dirname.length-5)+"templates/one/gramota.pdf");
});

app.listen(3001, () => {
  // let pdfImage = new pdf.PDFImage('./templates/one/gramota.pdf');

  // pdfImage.convertFile().then(function (imagePaths) {
  //   // [ /tmp/slide-0.png, /tmp/slide-1.png ]
  //   console.log(imagePaths)
  // });
  console.log('Example app listening on port 3001!');
});

