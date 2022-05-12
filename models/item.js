const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    item : {
        type : String,
        required : true
    }

})

const itemModel = mongoose.model("item",itemSchema,"item");

module.exports = itemModel;