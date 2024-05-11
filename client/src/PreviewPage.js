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
  <p style="text-align: center;">Заявка № от 03.05.2023 г.</p>
  <p>&nbsp;</p>
  <table style="width: 698.578px; margin-left: auto; margin-right: auto;">
    <tbody>
      <tr>
        <td style="width: 177px;">
          <p>Заказчик</p>
        </td>
        <td style="width: 505.578px;">
          <p>ООО &laquo;ДВ Транс&raquo;</p>
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
          <p>Адрес загрузки и конт. лицо на загрузке</p>
        </td>
        <td style="width: 505.578px;">
          <p>{{routea}}, Юрий 89144229803</p>
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
      <tr>
        <td style="width: 177px;">
          <p>Данные водителя</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </td>
        <td style="width: 505.578px;">
          <p>MERCEDES-BENZ ACTROS 1844 LS: а 637 хс 716rus SCHMITZ CARGOBULL 9084: ва 9232 16rus</p>
          <p>Баранов Дмитрий Александрович, проживающий по адресу: РОССИЯ, 461060, Оренбургская обл, р-н Курманаевский, с Курманаевка, ул Степана Разина, двлд. 55, Паспорт гражданина РФ, серия: 53 11, 155444, выдан: 17 мая 2012 года, ТЕРРИТОРИАЛЬНЫМ ПУНКТОМ УФМС РОССИИ ПО ОРЕНБУРГСКОЙ ОБЛ. В КУРМАНАЕВСКОМ РАЙОНЕ, код подр. 560-036, в/у 99 23 283356 от 14.09.2021-29.03.2027 гг., Дата рождения 08 мая 1967 г., ИНН 563300002983, тел: 79292814683</p>
        </td>
      </tr>
      <tr>
        <td style="width: 177px;">
          <p>Условия оплаты</p>
        </td>
        <td style="width: 505.578px;">
          <p>380 000 р. (НДС 20%). Оплата 50% предоплата после загрузки, 50% после получения копий документов о доставке груза в течение 3-х банковский дней</p>
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
    saveAs(blob, 'order.doc');
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
        .replace('{{executor}}', order.executor)
        .replace('{{customer}}', order.customer)
        .replace('{{routea}}', order.routea)
        .replace('{{routeb}}', order.routeb)
        .replace('{{cargo}}', order.cargo)
        .replace('{{vehicle}}', order.vehicle)
        .replace('{{deliveryDate}}', order.deliveryDate)
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
