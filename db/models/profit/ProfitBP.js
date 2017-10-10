const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let {BP} = require('../bp');
const {NAMES} = require('../../names');
let db = require('../../index');
let imGraph = require('../../../GraphHandler');


class Profit extends BP {

    constructor() {
        super();
        this.setACName(NAMES.profit)
    }

    evaluate() {


        let currentObject = this;
        return new Promise((resolve, reject) => {

            /*
            Here formula of calculated node must be implemented
             */
            function calculate(nodes) {
                currentObject.value = 0;
                nodes.forEach(node => {
                    currentObject.value += +node.value;
                });
            }

            calculate(imGraph.getNodesFromLoadedGraph(this.getFrom()));

            // this.getNodesByKeysFromMongo(this.getFrom()).then(nodes => {
            //
            //     resolve(this);
            //
            // });

            super.evaluate().then(res => {
                resolve(this);
            }).catch(err => reject(err));

        });

    }
}

module.exports = {
    Profit
};
