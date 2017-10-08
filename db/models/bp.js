const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * BP stands for blue print
 */
class BP {


    constructor() { //class constructor

        this.from = [];
        this.to = [];

        this.name = '';
    }

    /**
     * this is accumulated name for hierarchical nodes
     * @param key : key to add to previous name
     */
    setACName(key) {
        (this.name += (' ' + key)).trim();
    }

    getName() {
        return this.name;
    }

    addTo(key) {
        this.to = this.to.concat(key);
    }

    addFrom(key) {
        this.from = this.from.concat(key);
    }

    getTo() {
        return this.to;
    }

    getFrom() {
        return this.from;
    }

    evaluate() {
    }

    getValueByKeys(keys) {



    }


}

let bp_schema_obj = {

    to: {
        type: [String],
        required: false,
    },
    from: {
        type: [String],
        required: false,
    }


};


let options = {discriminatorKey: '_type', strict: false};
let bpSchema = new Schema(bp_schema_obj, options);
let bpModel = mongoose.model('BP', bpSchema);

module.exports = {
    BP,
    bp_schema_obj,
};
