import pdf from 'html-pdf';
import wkhtmltopdf from 'wkhtmltopdf';
//import pdftk from 'node-pdftk';


let t={name: 'test Document',
width: '1240',
height: '1754',
pages: 3,
uri: './templates/gramota.pdf',
data:[
  {
    id: 0,
    label: "first",
    val: "String",
  },
  {
    id: 1,
    label: "second",
    val: "",
  },
],
rects:[
  {
    id: '0',
    page: 1,
    style: 'position:absolute; left: 40mm ; top: 40mm; width: 50mm; height:20mm; border: 1px solid black',
  },
  {
    id: '1',
    page: 2,
    style: '',
  }
],}

function htmlToPDF(){
    const _html=`
    <html>
        <header>
            <meta charset="utf-8">
        </header>
        <body>
            <div class="rects">
                ${t.rects.map(curMeta => `<div style="${curMeta.style}">${t.data[parseInt(curMeta.id)].val}</div>`).join('')}
            </div>
        </body>
    </html>`;

    var options = { output: './tools/tmp/diploma.pdf', pageSize: 'A4', marginLeft: 0, marginRight: 0 , marginTop : 0, marginBottom: 0, noBackground:true};
    let file = pdf.create(_html)
    wkhtmltopdf(_html, options);
    // console.log(_html)
    // pdf.create(_html, options).toFile('./tools/tmp/diploma.pdf', function(err, res) {
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    // }) 
}

module.exports={
    htmlToPDF,
}