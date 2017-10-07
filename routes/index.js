var express = require('express');
var router = express.Router();
const config = require('../config');
const {PeriodIncome} = require('../db/models/PeriodIncomeBP');
/* GET home page. */
router.get('/', function (req, res, next) {


    let periodIncome = new PeriodIncome();
    periodIncome.setIncome(1000);
    periodIncome.setNameOfPeriod('فروردین');
    periodIncome.setStartOfPeriod(Date.now());
    periodIncome.setEndOfPeriod(Date.now());
    periodIncome.save().then(() => {

        console.log('successful');

    });

    res.render('index', {title: 'Express'});


});


function sendError(res, err, error_code) {
    res.json({
        error_code: error_code,
        error: err.code ? err.code : err
    });
}


module.exports = router;
