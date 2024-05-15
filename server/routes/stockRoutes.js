// stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const multer = require('multer');
const upload = multer({ dest: 'public/' });

router.get('/', stockController.getAllStocks);
router.post('/', stockController.createStock);
router.put('/:id', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);
router.get('/:id/photos', stockController.getStockPhotos);
router.post('/:id/photos', upload.array('photos'), stockController.uploadStockPhotos);
router.delete('/:id/photos/:photo', stockController.deleteStockPhoto);

module.exports = router;
