const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP,bp_schema_obj } = require('../bp');
const {NAMES} = require('../../names');

class Income extends BP {

    constructor() {
        super();
        this.setACName(NAMES.income)
    }
    getIncome(){
        return this.income;
    }
    setIncome(value) {
        this.income = value;
    }

}

let income_schema_obj = Object.assign({} ,bp_schema_obj,{

    income: {
        type: Number,
        required: true,
    }

});


let options ={ discriminatorKey : '_type', strict: false};
let incomeSchema = new Schema(income_schema_obj, options);
let incomeModel = mongoose.model('Income', incomeSchema);


module.exports = {
    Income,
    income_schema_obj
};
