// components/OrderPreviewPrint.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { saveAs } from 'file-saver';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    <div class="application">
      <div class="section">
        ИНН/КПП: {{INN_KPP}}, ОКПО: {{OKPO}}<br>
        Юридический адрес: {{legalAddress}}<br>
        Банковские реквизиты: {{bankDetails}}<br>
        БИК: {{BIC}}, к/с: {{corrAccount}}<br>
      </div>

      <h2>Заявка к договору транспортной экспедиции №{{contractNumber}}</h2>

      <div class="section">
        <strong>1. ПУНКТ ОТПРАВЛЕНИЯ:</strong> {{departurePoint}}<br>
        <strong>ПУНКТ НАЗНАЧЕНИЯ:</strong> {{customer}}<br>
      </div>
      <!-- Продолжение шаблона -->
    </div>
  </body>
  </html>
`;

const OrderPreviewPrint = ({ open, onClose, order }) => {

    const generateContent = () => {
        return `<div id="contentToConvert">${transportApplicationTemplate
            .replace('{{customer}}', order.customer)}</div>`;
    };

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
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Предварительный просмотр заказа
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: generateContent() }} />
                <Button onClick={saveToWord}>Сохранить в Word</Button>
                <Button onClick={handlePrint}>Печать</Button>
            </Box>
        </Modal>
    );
};

export default OrderPreviewPrint;