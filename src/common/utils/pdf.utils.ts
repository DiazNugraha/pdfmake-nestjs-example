export async function generateBuffer(pdfDoc: pdfMake.TCreatedPdf) {
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    pdfDoc.getBuffer((buffer: Buffer) => {
      try {
        resolve(buffer);
      } catch (error) {
        reject(error);
      }
    });
  });

  const chunkSize = 5;
  let offset = 0;
  const chunks = [];
  while (offset < buffer.length) {
    const chunk = buffer.slice(offset, offset + chunkSize);
    chunks.push(chunk);
    offset += chunkSize;
  }

  return Buffer.concat(chunks);
}
