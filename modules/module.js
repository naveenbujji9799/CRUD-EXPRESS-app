var express = require('express');

var router = express.Router();
var crud = require('./api/crudapp/crud');

router.post('/add',crud.adddata);
router.get('/get',crud.getdata);
router.delete('/delete/:id',crud.deletedata);
router.put('/update/:id',crud.updatedata);

module.exports = router;