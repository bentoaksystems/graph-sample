/**
 * BP stands for blue print
 */

let graphHandler = require('../../GraphHandler');
let db = require('../index');

class BP {

    /**
     *
     * @param obj is palin object which is needed to be casted on BP class
     */
    constructor(obj = null) {

        this.from = [];
        this.to = [];

        this.name = '';
        this.value = 0;


        if (obj)
            obj && Object.assign(this, obj);
    }

    /**
     * this is accumulated name for hierarchical nodes
     * @param key : key to add to previous name
     */
    setACName(key) {
        this.name = (this.name + (' ' + key)).trim();
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

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        graphHandler.updateGraph(this.name, 'value', this.value);

        if (this.to.length > 0) {

            graphHandler.getNodesFromLoadedGraph(this.to).forEach(n => {
                n.evaluate();
            })
        }

    }

    evaluate() {

        let currentObject = this;
        return new Promise((resolve, reject) => {

            if (currentObject.name && !graphHandler.nodeExistsOnLoadedGraph(currentObject.name))
                graphHandler.addToGraph([currentObject]);

            resolve();
        });
    }

    save() {

        let current_object = this;
        return new Promise((resolve, reject) => {
            let query = {'name': current_object.name};
            db.nodes.findOneAndUpdate(query, current_object, {upsert: true}, function (err, doc) {
                if (err) reject();
                resolve();
            });
        });

    }


}


module.exports = {
    BP
};
