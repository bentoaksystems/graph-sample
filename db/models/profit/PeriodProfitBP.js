const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
let Schema = mongoose.Schema;
let {Profit, profit_schema_obj} = require('./ProfitBP');
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

            new periodProfitModel({
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

let period_profit_schema_obj = Object.assign({}, profit_schema_obj, {
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


let options = {discriminatorKey: '_type', strict: false};
let periodProfitSchema = new Schema(period_profit_schema_obj, options);
let periodProfitModel = mongoose.model('PeriodProfit', periodProfitSchema);

module.exports = {
    PeriodProfit,
    period_profit_schema_obj
};
