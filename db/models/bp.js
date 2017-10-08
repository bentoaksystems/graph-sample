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

        return new Promise((resolve, reject) => {
            Nodes.findOne({name: keys[0]}).then(node => {

                if (!node)
                    reject();

                if (keys[1])
                    resolve(node[keys[1]]);
                else
                    resolve(node);


            });

        });


    };
}


let
    bp_schema_obj = {

        to: {
            type: [String],
            required: false,
        },
        from: {
            type: [String],
            required: false,
        }


    };


let options = {strict: false};
let bpSchema = new Schema(bp_schema_obj, options);
let Nodes = mongoose.model('Nodes', bpSchema);

module.exports = {
    BP,
    Nodes
};
