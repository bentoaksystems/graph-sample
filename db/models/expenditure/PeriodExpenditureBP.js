const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Expenditure} = require('./expenditureBP');
let {Nodes} = require('../bp');
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

    save() {

        return new Promise((resolve, reject) =>{

            new bpModel({
                expenditure: this.getExpenditure(),
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
    PeriodExpenditure
};
