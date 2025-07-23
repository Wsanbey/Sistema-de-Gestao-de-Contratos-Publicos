const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/ContratoController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/create',
  upload.fields([
    { name: 'arquivo_contrato', maxCount: 10 },
    { name: 'arquivo_empenho', maxCount: 10 }
  ]),
  ContratoController.creat
);

router.put('/update/:id', 
  upload.fields([
    { name: 'arquivo_contrato', maxCount:10},
    { name: 'arquivo_empenho', maxCount:10 }
  
  ]),
  ContratoController.UpDate
);
 

router.get('/list', ContratoController.listar);
router.get('/:id', ContratoController.buscarPorId);
router.delete('/:id', ContratoController.deletar);
router.get('/arquivo/:id', ContratoController.gerarUrlTemporariaMinio);

module.exports = router;
