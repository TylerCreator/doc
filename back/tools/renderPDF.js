import pdftk from 'node-pdftk';

async function mergePDF() {
  pdftk
    .input('./templates/one/gramota.pdf')
    .stamp('./tools/tmp/diploma.pdf')
    .output('./tools/tmp/out.pdf')
    .then((buffer) => {
      console.log(`pdf has been changed${buffer}`);
      // Do stuff with the output buffer
    })
    .catch((err) => {
      console.log(err); // handle errors
    });
}

module.exports = {
  mergePDF,
  // htmlToPDF:htmlToPDF(),
};
