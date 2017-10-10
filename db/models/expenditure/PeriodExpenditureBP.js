const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Expenditure} = require('./expenditureBP');
let db = require('../../index');
const {NAMES} = require('../../names');

class PeriodExpenditure extends Expenditure {

    constructor() {
        super();
    }


    setPeriod(name, start, end) {
        this.periodName = name;
        this.setACName(name);
        this.start = start;
        this.end = end;

        this.addTo(NAMES.profit + ' ' + name);
    }

    getStartOfPeriod() {

        return this.start;
    }

    getEndOfPeriod() {
        return this.end;
    }

}

module.exports = {
    PeriodExpenditure
};
