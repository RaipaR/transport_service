// PreviewPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintIcon from '@mui/icons-material/Print';
import { saveAs } from 'file-saver';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; // Получаем заказ из состояния маршрута

  const transportApplicationTemplate = `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Заявка на автоперевозку</title>
    <style>
      body { font-family: Times New Roman, sans-serif; }
      .application { margin: 20px; }
      .section { margin-bottom: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
    </style>
  </head>
  <body>
  <p><strong>&nbsp;</strong></p>
  <p style="text-align: center;">Заказ № {{orderNumber}} от {{createDate}} г.</p>
  <p>&nbsp;</p>
  <table style="width: 698.578px; margin-left: auto; margin-right: auto;">
    <tbody>
      <tr>
        <td style="width: 177px;">
          <p>Заказчик</p>
        </td>
        <td style="width: 505.578px;">
          <p>ООО &laquo;ВНЕШТРАНС&raquo;</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Исполнитель</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{executor}}</p>
        </td>
      </tr>
      <tr>
      <td style="width: 177px;">
        <p>Клиент</p>
      </td>
      <td style="width: 505.578px;">
        <p>{{customer}}</p>
      </td>
    </tr>
      <tr>
        <td style="width: 177px;">
          <p>Маршрут</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{routea}}-{{routeb}}</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Сведения о грузе</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{cargo}}</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Сведения о транспорте</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{vehicle}}</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Дата и время загрузки</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{deliveryDate}}</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Адрес загрузки</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{routea}}</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Дата и время разгрузки</p>
        </td>
        <td style="width: 505.578px;">
          <p>По ТТН</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Адрес выгрузки и контактное лицо</p>
        </td>
        <td style="width: 505.578px;">
          <p>По ТТН</p>
        </td>
      </tr>
    </tbody>
  </table>
  <p>&nbsp;&nbsp;</p>
  <p style="text-align: center;">Исполнитель __________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Заказчик__________</p>
  </body>
  </html>
`;

const saveToWord = () => {
    const blob = new Blob([generateContent()], { type: 'application/msword;charset=utf-8' });
    saveAs(blob, 'Заказ.doc');
};

const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generateContent());
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

const generateContent = () => {
    return `<div id="contentToConvert">${transportApplicationTemplate
        .replace('{{orderNumber}}', order.orderNumber)
        .replace('{{createDate}}', new Date(order.createDate).toLocaleDateString())
        .replace('{{executor}}', order.executor)
        .replace('{{customer}}', order.customer)
        .replace('{{routea}}', order.routea)
        .replace('{{routeb}}', order.routeb)
        .replace('{{cargo}}', order.cargo)
        .replace('{{vehicle}}', order.vehicle)
        .replace('{{deliveryDate}}', new Date(order.deliveryDate).toLocaleDateString())
        .replace('{{routea}}', order.routea)}</div>`;
};

return (
  <div>
    <div dangerouslySetInnerHTML={{ __html: generateContent(order) }} />
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </IconButton>
    <IconButton onClick={saveToWord}>
      <SaveAltIcon />
    </IconButton>
    <IconButton onClick={handlePrint}>
      <PrintIcon />
    </IconButton>
  </div>
);
};
export default PreviewPage;
