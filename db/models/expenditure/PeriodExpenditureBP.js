const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Expenditure, expenditure_schema_obj} = require('./expenditureBP');
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

            new periodExpenditureModel({
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

let period_expenditure_schema_obj =Object.assign({} ,expenditure_schema_obj, {
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
let periodExpenditureSchema = new Schema(period_expenditure_schema_obj, options);
let periodExpenditureModel = mongoose.model('PeriodExpenditure', periodExpenditureSchema);

module.exports = {
    PeriodExpenditure,
    period_expenditure_schema_obj
};
