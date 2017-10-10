const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Profit} = require('./ProfitBP');
const {NAMES} = require('../../names');

class PeriodProfit extends Profit {

    constructor() {
        super();
    }


    setPeriod(name, start, end) {
        this.periodName = name;
        this.setACName(name);
        this.start = start;
        this.end = end;

        let related_node_names = [NAMES.income + ' ' + name, NAMES.expenditure + ' ' + name];

        this.addFrom(related_node_names);

    }

    getStartOfPeriod() {

        return this.start;
    }

    getEndOfPeriod() {
        return this.end;
    }

    evaluate() {

        return new Promise((resolve, reject) => {

            super.evaluate().then(res => {
                resolve(res);
            }).catch(err => reject(err));

        });


    }


    save() {

    }
}

module.exports = {
    PeriodProfit
};
