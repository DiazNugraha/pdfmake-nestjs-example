import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as fs from 'fs';
import * as path from 'path';
import {
  Margins,
  TDocumentDefinitions,
  TFontDictionary,
} from 'pdfmake/interfaces';

export default async function PrintPDf() {
  const tableLayouts = {
    customLayout: {
      body: [
        ['Left', 'Center', 'Right', 'Justify'],
        ['1', '2', '3', '4'],
        ['5', '6', '7', '8'],
        ['9', '10', '11', '12'],
      ],
      hLineWidth: function (i: number, node: any) {
        if (i === 0 || i === node.table.body.length) {
          return 0;
        }
        return i === node.table.headerRows ? 0 : 0.5;
      },
      vLineWidth: function () {
        return 0;
      },
      hLineColor: function () {
        return '#aaaaaa';
      },
      paddingLeft: function (i: number) {
        return 8;
      },
      paddingRight: function (i: number, node: any) {
        return 8;
      },
    },
  };

  console.log(__dirname);

  const pdfMakeConstants = {
    VFS: {
      'fonts/century-gothic/GOTHIC.woff': await fs.promises.readFile(
        path.join(
          __dirname,
          '..',
          '..',
          'assets/fonts/century-gothic/GOTHIC.woff',
        ),
      ),
      'fonts/century-gothic/GOTHICB.woff': await fs.promises.readFile(
        path.join(
          __dirname,
          '..',
          '..',
          'assets/fonts/century-gothic/GOTHICB.woff',
        ),
      ),
      'fonts/century-gothic/GOTHICBI.woff': await fs.promises.readFile(
        path.join(
          __dirname,
          '..',
          '..',
          'assets/fonts/century-gothic/GOTHICBI.woff',
        ),
      ),
      'fonts/century-gothic/GOTHICI.woff': await fs.promises.readFile(
        path.join(
          __dirname,
          '..',
          '..',
          'assets/fonts/century-gothic/GOTHICI.woff',
        ),
      ),
    },
  };

  const fonts: TFontDictionary = {
    CenturyGothic: {
      normal: 'fonts/century-gothic/GOTHIC.woff',
      bold: 'fonts/century-gothic/GOTHICB.woff',
      italics: 'fonts/century-gothic/GOTHICI.woff',
      bolditalics: 'fonts/century-gothic/GOTHICBI.woff',
    },
    Urbanist: {
      normal: `fonts/Urbanist/Urbanist-Regular.ttf`,
    },
  };

  const docDefinition = {
    paperSize: 'A4',
    defaultStyle: {
      font: 'CenturyGothic',
      fontSize: 10,
    },
    pageMargins: [15, 320, 15, 150] as Margins,
    content: [
      'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
      {
        columns: [
          {
            width: 'auto',
            text: 'First column',
          },
          {
            width: '*',
            text: 'Second column',
          },
          {
            width: 100,
            text: 'Third column',
          },
          {
            width: '20%',
            text: 'Fourth column',
          },
        ],
        columnGap: 10,
      },
      'This paragraph goes below all columns and has full width',
    ],
  };

  pdfFonts.pdfMake.vfs = Object.assign(
    {},
    pdfFonts.pdfMake.vfs,
    pdfMakeConstants.VFS,
  );

  const pdfDoc = pdfMake.createPdf(
    docDefinition as TDocumentDefinitions,
    tableLayouts,
    fonts,
    pdfFonts.pdfMake.vfs,
  );

  return pdfDoc;
}
