var express = require('express');
var router = express.Router();
const {PeriodIncome} = require('../db/models/income/PeriodIncomeBP');
const {PeriodExpenditure} = require('../db/models/expenditure/PeriodExpenditureBP');
const {PeriodProfit} = require('../db/models/profit/PeriodProfitBP');
const {NAMES} = require('../db/names');
const {BP} = require('../db/models/bp');
let graphHandler = require('../GraphHandler');

router.use((req, res, next) => {

    if (graphHandler.getGraph().length === 0)

        graphHandler.loadGraphFromMongo().then(() => {
            next();
        });
    else
        next();

});


/* GET home page. */
router.get('/', function (req, res, next) {

    res.json(graphHandler.getGraph());
});

router.post('/addIncome', function (req, res, next) {

    let periodIncome = new PeriodIncome();
    periodIncome.setValue(req.body.income);
    periodIncome.setPeriod(req.body.periodName, Date.now(), Date.now());
    periodIncome.save().then(() => {
        graphHandler.addToGraph([periodIncome]);
        res.json(graphHandler.getGraph())
    });


});

router.post('/addExpenditure', function (req, res, next) {

    let periodExpenditure = new PeriodExpenditure();
    periodExpenditure.setValue(req.body.expenditure);
    periodExpenditure.setPeriod(req.body.periodName, Date.now(), Date.now());
    periodExpenditure.save().then(() => {
        graphHandler.addToGraph([periodExpenditure]);
        res.json(graphHandler.getGraph())
    });

});


router.post('/calcProfit', function (req, res, next) {
    let periodProfit = new PeriodProfit();
    periodProfit.setPeriod(req.body.periodName, Date.now(), Date.now());

    periodProfit.evaluate().then(result => {
        res.json(result);

    }).catch(err => {
        res.json(err)
    });

});


router.post('/changeIncome', function (req, res, next) {

    let obj = graphHandler.getNodesFromLoadedGraph([NAMES.income + ' ' + req.body.periodName])[0];
    let bpObject = new BP(obj);
    bpObject.setValue(Number.parseInt(req.body.income));
    res.json(graphHandler.getGraph())

});
router.post('/saveIncome', function (req, res, next) {

    let obj = graphHandler.getNodesFromLoadedGraph([NAMES.income + ' ' + req.body.periodName])[0];
    let bpObject = new BP(obj);
    bpObject.save();
    res.json('new income is saved!')

});


router.post('/changeExpenditure', function (req, res, next) {

    let obj = graphHandler.getNodesFromLoadedGraph([NAMES.expenditure + ' ' + req.body.periodName])[0];
    let bpObject = new BP(obj);
    bpObject.setValue(Number.parseInt(req.body.expenditure));
    res.json(graphHandler.getGraph())

});
router.post('/saveExpenditure', function (req, res, next) {

    let obj = graphHandler.getNodesFromLoadedGraph([NAMES.expenditure + ' ' + req.body.periodName])[0];
    let bpObject = new BP(obj);
    bpObject.save();
    res.json('new expenditure is saved!')

});


function sendError(res, err, error_code) {
    res.json({
        error_code: error_code,
        error: err.code ? err.code : err
    });
}


module.exports = router;
