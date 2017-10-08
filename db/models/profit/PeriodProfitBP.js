const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Profit} = require('./ProfitBP');
let {Nodes} = require('../bp');
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

        this.addFrom([NAMES.income + ' ' + name, NAMES.expenditure + ' ' + name])
    }

    getStartOfPeriod() {

        return this.start;
    }

    getEndOfPeriod() {
        return this.end;
    }

    evaluate(){
        super.evaluate();

    }


    save() {

        return new Promise((resolve, reject) => {

            new bpModel({
                profit: this.getProfit(),
                name: this.getName(),
                start: this.getStartOfPeriod(),
                end: this.getEndOfPeriod(),
                to: this.getTo(),
                from: this.getFrom()
            }).save().then(pi => {
                console.log(pi);
                resolve();

            }).catch(err => {
                console.error(err);
                reject();
            });


        });

    }
}

module.exports = {
    PeriodProfit
};
