import wkhtmltopdf from 'wkhtmltopdf';
import pdftk from 'node-pdftk';
import fs from 'fs';

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

async function createPDF(data) {
  const { t } = data;
  const { fields } = data;
  console.log(fields);
  // console.log();
  const htmlTMP = `
    <html>
        <header>
            <meta charset="utf-8">
        </header>
        <body>
            <div class="rects">
                ${t.rects.map(curMeta => `<div style="${curMeta.style}">${(fields.length - 1 >= parseInt(curMeta.id, 10) &&
                  parseInt(curMeta.id, 10) >= 0) ? fields[parseInt(curMeta.id, 10)].val : ''}</div>`).join('')}
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
