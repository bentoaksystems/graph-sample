const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// can save data out of schema using strict: false

let schema_obj ={};

schema_obj['hello'] = {
    type: {
     value :String,
     docs: [String]
    },
    required: true,
    trim: true
};


let testSchema = new Schema( schema_obj, {strict: false});

let Test = mongoose.model('Test', testSchema);

module.exports = {Test};
