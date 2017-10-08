const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP } = require('../bp');
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

module.exports = {
    Expenditure
};
