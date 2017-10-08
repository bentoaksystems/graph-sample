const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Income, income_schema_obj} = require('./IncomeBP');
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

            new periodIncomeModel({
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

let period_income_schema_obj =Object.assign({}, income_schema_obj,{
    name: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    }

});



let options ={ discriminatorKey : '_type', strict: false};
let periodIncomeSchema = new Schema(period_income_schema_obj, options);
let periodIncomeModel = mongoose.model('PeriodIncome', periodIncomeSchema);

module.exports = {
    PeriodIncome,
    period_income_schema_obj
};
