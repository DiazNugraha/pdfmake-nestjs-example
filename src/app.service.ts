import { Injectable } from '@nestjs/common';
import PrintPDf from './etc/print-pdf';
import { generateBuffer } from './common/utils/pdf.utils';

@Injectable()
export class AppService {
  async generatePDF() {
    const pdfDoc: pdfMake.TCreatedPdf = await PrintPDf();
    const buffer = await generateBuffer(pdfDoc);
    return buffer;
  }
}
