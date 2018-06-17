import wkhtmltopdf from 'wkhtmltopdf';
import pdftk from 'node-pdftk';
import fs from 'fs';


// const t = {
//   name: 'test Document',
//   width: '1240',
//   height: '1754',
//   pages: 3,
//   uri: './templates/one/gramota.pdf',
//   data: [
//     {
//       id: 0,
//       label: 'Диплом *степени* вручается',
//       val: 'I СТЕПЕНИ ВРУЧАЕТСЯ',
//     },
//     {
//       id: 1,
//       label: 'Кому вручается',
//       val: 'Климонову Михаилу Сергеевичу',
//     },
//     {
//       id: 1,
//       label: 'За что',
//       val: 'За разработку данного приложения в секции информационные и алгебраические системы кафедры естественных наук Иркутского государсвтвенного университета',
//     },
//   ],
//   rects: [
//     {
//       id: '0',
//       page: 1,
//       style: 'position:absolute; left: 30mm ; top: 120mm; width: 204mm; height:15mm; border: 1px solid black; text-align:center; font-size:50px; vertical-align: text-top;',
//     },
//     {
//       id: '1',
//       page: 1,
//       style: 'position:absolute; left: 30mm ; top: 150mm; width: 204mm; height:8mm; border: 1px solid black; text-align:center; font-size:30px; vertical-align: text-top;',
//     },
//     {
//       id: '2',
//       page: 1,
//       style: 'position:absolute; left: 30mm ; top: 170mm; width: 204mm; height:8mm; text-align:center; border: none; font-size:30px; vertical-align: text-top;',
//     },
//   ],
// };

async function mergePDF(inputt, st, newPDF) {
  return pdftk
    .input(inputt)
    .stamp(st)
    .output(newPDF)
    .then(() => {
      console.log('pdf has been merged');
      return newPDF;
      // Do stuff with the output buffer
    })
    .catch((err) => {
      console.log(err); // handle errors
    });
}

async function createPDF(t) {
  // console.log(t.uri);
  // console.log();
  const htmlTMP = `
    <html>
        <header>
            <meta charset="utf-8">
        </header>
        <body>
            <div class="rects">
                ${t.rects.map(curMeta => `<div style="${curMeta.style}">${t.data[parseInt(curMeta.id, 10) - 1].val}</div>`).join('')}
            </div>
        </body>
    </html>`;
  const fileName = './file.html';
  const s = fs.createWriteStream(fileName);
  s.once('open', () => {
    s.end(`<!DOCTYPE html>${htmlTMP}`);
  });
  const path = `${t.uri.substring(0, t.uri.lastIndexOf('/'))}/${Date.now()}.pdf`;
  // console.log(path);
  const options = {
    output: path, pageSize: 'A4', marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, noBackground: true,
  };

  const wkhtmltopdfp = (h, o) => new Promise((resolve, reject) => {
    wkhtmltopdf(h, o, (err, stream) => {
      if (err) { return reject(err); }
      return resolve(stream);
    });
  });
  try {
    await wkhtmltopdfp(htmlTMP, options);
  } catch (err) {
    return 'everything is broken';
  }
  const resultPATH = await mergePDF(t.uri, path, `${t.uri.substring(0, t.uri.lastIndexOf('/'))}/${Date.now()}.pdf`);
  console.log(resultPATH);
  return resultPATH;
  // let file = pdf.create(_html)
  // console.log(_html)
  // pdf.create(_html, options).toFile('./tools/tmp/diploma.pdf', function(err, res) {
  //     if (err) return console.log(err);
  //     console.log(res); // { filename: '/app/businesscard.pdf' }
  // })
}

module.exports = {
  createPDF,
};
