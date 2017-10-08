const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP,bp_schema_obj } = require('../bp');
const {NAMES} = require('../../names');

class Expenditure extends BP {

    constructor() {
        super();
        this.setACName(NAMES.expenditure)
    }
    getExpenditure(){
        return this.expenditure;
    }
    setExpenditure(value) {
        this.expenditure = value;
    }

}
let expenditure_schema_obj = Object.assign({},bp_schema_obj, {

    expenditure: {
        type: Number,
        required: true,
    }

});


let options ={ discriminatorKey : '_type', strict: false};
let expenditureSchema = new Schema(expenditure_schema_obj, options);
let expenditureModel = mongoose.model('Expenditure', expenditureSchema);


module.exports = {
    Expenditure,
    expenditure_schema_obj
};
