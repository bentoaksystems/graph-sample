const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP } = require('../bp');
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



module.exports = {
    Income
};
