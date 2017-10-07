var express = require('express');
var router = express.Router();
const config = require('../config');
const {Test} = require('../db/models/test');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });



    let obj = {};

    obj['hello'] = {
        value: req.body['hello'],
        docs: ['ehsan','ehsan','ehsan','ehsan']
    };

    let test = new Test(obj);

    console.log(test);

    test.save().then(doc => {
        res.json({
            error_code: 0,
            id: doc._id
        });


    }).catch(err => {
        console.error(err);
        sendError(res, err, config.DB_ERROR);

    });

});


function sendError(res, err, error_code) {
    res.json({
        error_code: error_code,
        error: err.code ? err.code : err
    });
}


module.exports = router;
