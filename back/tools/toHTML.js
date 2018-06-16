// import pdf from 'html-pdf';
import wkhtmltopdf from 'wkhtmltopdf';
// import pdftk from 'node-pdftk';


const t = {
  name: 'test Document',
  width: '1240',
  height: '1754',
  pages: 3,
  uri: './templates/one/gramota.pdf',
  data: [
    {
      id: 0,
      label: 'Диплом *степени* вручается',
      val: 'I СТЕПЕНИ ВРУЧАЕТСЯ',
    },
    {
      id: 1,
      label: 'Кому вручается',
      val: 'Климонову Михаилу Сергеевичу',
    },
    {
      id: 1,
      label: 'За что',
      val: 'За разработку данного приложения в секции информационные и алгебраические системы кафедры естественных наук Иркутского государсвтвенного университета',
    },
  ],
  rects: [
    {
      id: '0',
      page: 1,
      style: 'position:absolute; left: 30mm ; top: 120mm; width: 204mm; height:15mm; border: 1px solid black; text-align:center; font-size:50px; vertical-align: text-top;',
    },
    {
      id: '1',
      page: 1,
      style: 'position:absolute; left: 30mm ; top: 150mm; width: 204mm; height:8mm; border: 1px solid black; text-align:center; font-size:30px; vertical-align: text-top;',
    },
    {
      id: '2',
      page: 1,
      style: 'position:absolute; left: 30mm ; top: 150mm; width: 204mm; height:8mm; border: 1px solid black; text-align:center; font-size:30px; vertical-align: text-top;',
    },
  ],
};

function htmlToPDF() {
  
  const htmlTMP = `
    <html>
        <header>
            <meta charset="utf-8">
        </header>
        <body>
            <div class="rects">
                ${t.rects.map(curMeta => `<div style="${curMeta.style}">${t.data[parseInt(curMeta.id, 10)].val}</div>`).join('')}
            </div>
        </body>
    </html>`;

  const options = {
    output: './tools/tmp/diploma.pdf', pageSize: 'A4', marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, noBackground: true,
  };

  wkhtmltopdf(htmlTMP, options);
  // let file = pdf.create(_html)
  // console.log(_html)
  // pdf.create(_html, options).toFile('./tools/tmp/diploma.pdf', function(err, res) {
  //     if (err) return console.log(err);
  //     console.log(res); // { filename: '/app/businesscard.pdf' }
  // })
}

module.exports = {
  htmlToPDF,
};
