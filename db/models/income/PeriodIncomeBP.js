const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Income} = require('./IncomeBP');
let {Nodes} = require('../bp');
const {NAMES} = require('../../names');

class PeriodIncome extends Income {

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
                income: this.getIncome(),
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
    PeriodIncome
};
