import pdf from 'html-pdf';
import pdftk from 'node-pdftk';
import  {htmlToPDF}  from './toHTML';

async function mergePDF(){ 
    pdftk
    .input('./templates/one/gramota.pdf')
    .stamp('./tools/tmp/diploma.pdf')
    .output('./tools/tmp/out.pdf')
    .then(buffer => {
        // Do stuff with the output buffer
    })
    .catch(err => {
        console.log(err) // handle errors
    });
    console.log('pdf has been changed', )
};

function createPDF(){ 
    htmlToPDF(),
    mergePDF()
};

module.exports={
    createPDF:createPDF(),
    mergePDF,
    // htmlToPDF:htmlToPDF(),
}