const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP } = require('../bp');
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

        this.setProfit();

    }


}

module.exports = {
    Profit
};
