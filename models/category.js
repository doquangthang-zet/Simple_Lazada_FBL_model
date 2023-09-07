const mongoose = require("mongoose");

//Model for album collection
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'categories'
    },
    properties: [{
        type: Object
    }],
},
{timestamps: true}
);

module.exports = mongoose.model("categories", categorySchema);