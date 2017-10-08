var express = require('express');
var router = express.Router();
const config = require('../config');
const {PeriodIncome} = require('../db/models/income/PeriodIncomeBP');
const {PeriodExpenditure} = require('../db/models/expenditure/PeriodExpenditureBP');
const {PeriodProfit} = require('../db/models/profit/PeriodProfitBP');
const {NAMES} = require('../db/names');
/* GET home page. */
router.get('/', function (req, res, next) {


    let periodIncome = new PeriodIncome();
    periodIncome.setIncome(1000);
    periodIncome.setPeriod(NAMES.Farvardin, Date.now(), Date.now());

    periodIncome.evaluate();

    // periodIncome.save().then(() => {
    //
    //     console.log('successful');
    //
    // });


    // let periodExpenditure = new PeriodExpenditure();
    // periodExpenditure.setExpenditure(1000);
    // periodExpenditure.setPeriod(NAMES.Farvardin, Date.now(), Date.now());
    // periodExpenditure.save().then(() => {
    //
    //     console.log('successful');
    //
    // });
    //
    //
    // let periodProfit = new PeriodProfit();
    // periodProfit.setProfit(1000);
    // periodProfit.setPeriod(NAMES.Farvardin, Date.now(), Date.now());
    // periodProfit.save().then(() => {
    //
    //     console.log('successful');
    //
    // });

    res.render('index', {title: 'Express'});


});


function sendError(res, err, error_code) {
    res.json({
        error_code: error_code,
        error: err.code ? err.code : err
    });
}


module.exports = router;
