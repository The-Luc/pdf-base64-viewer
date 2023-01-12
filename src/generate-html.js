const html = pdf => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="width:100vw;height:100vh;overflow:hidden;margin:0">
    <embed
      id="pdf-el"
      src=""
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
      height="100%"
      width="100%"
  ></embed>

    <script>
      const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      };

      window.addEventListener('load', event => {
        const pdfEl = document.querySelector('#pdf-el');
        const b64Data = '${pdf}';

        const blob = b64toBlob(b64Data, 'application/pdf');
        const blobUrl = URL.createObjectURL(blob);

        // window.location = blobUrl;
        pdfEl.src = blobUrl;
      });
    </script>
  </body>
</html>
`;

module.exports = { htmlString: html };
