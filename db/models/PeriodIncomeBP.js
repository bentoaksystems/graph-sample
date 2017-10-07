const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Income, incomeSchema} = require('./IncomeBP');

class PeriodIncome extends Income {

    constructor() {
        super();
    }

    getNameOfPeriod() {
        return this.name;
    }

    setNameOfPeriod(name) {

        this.name = name;
    }

    getStartOfPeriod() {

        return this.start;
    }

    setStartOfPeriod(start) {

        this.start = start;
    }


    getEndOfPeriod() {
        return this.end;
    }

    setEndOfPeriod(end) {

        this.end = end;
    }


    save() {

        return new Promise((resolve, reject) =>{

            new periodIncomeModel({
                income: this.getIncome(),
                name: this.getNameOfPeriod(),
                start: this.getStartOfPeriod(),
                end: this.getEndOfPeriod()
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

let schema_obj = {
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

};

let periodIncomeSchema = incomeSchema.extend(schema_obj, {discriminatorKey: '_type', strict: false});
let periodIncomeModel = mongoose.model('periodIncome', periodIncomeSchema);

module.exports = {
    PeriodIncome,
    periodIncomeSchema
};
