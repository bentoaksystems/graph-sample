const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var {BP} = require('./bp');

class Income extends BP {

    constructor() {
        super();



    }

    getIncome(){
        return this.income;
    }
    setIncome(value) {

        this.income = value;
    }

}
let schema_obj = {

    income: {
        type: Number,
        required: true,
    }

};

let incomeSchema = new Schema(schema_obj, {discriminatorKey : '_type' ,strict: false});

let incomeModel = mongoose.model('Income', incomeSchema);

module.exports = {
    Income,
    incomeSchema
};
