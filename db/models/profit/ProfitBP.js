const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP,bp_schema_obj } = require('../bp');
const {NAMES} = require('../../names');

class Profit extends BP {

    constructor() {
        super();
        this.setACName(NAMES.profit)
    }
    getProfit(){
        return this.profit;
    }
    setProfit(value) {
        this.profit = value;
    }

    evaluate(){

        super.evaluate();

        this.setProfit( )

    }


}

let profit_schema_obj =Object.assign({} ,bp_schema_obj, {

    profit: {
        type: Number,
        required: true,
    }

});


let options ={ discriminatorKey : '_type', strict: false};
let profitSchema = new Schema(profit_schema_obj, options);
let profitModel = mongoose.model('profit', profitSchema);


module.exports = {
    Profit,
    profit_schema_obj
};
