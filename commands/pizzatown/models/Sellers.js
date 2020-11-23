const mongoose = require("mongoose")

const pizzaSchema = new mongoose.Schema({
    name:{
        type:String
    },
    cost:{
        type:Number,
        min:1,
        max:1000
    },
    production:{
        type:Number,
        min:1,
        max:1000
    }
})

const storeSchema = new mongoose.Schema({
    profitmultiplier:{
        type:Number
    }
})

const sellerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    pizzaTokens:{
        type:Number,
        default:1000
    },
    menu: {
        type:[pizzaSchema],
        default:[]
    },
    discord_id:{
        type:String
    }, 
    stores:{
        type:[storeSchema],
        default:[{profitmultiplier:2}]
    },
    collectdate:{
        type:Date,
        default:Date.now()
    }
})

module.exports = {Seller:mongoose.model("Sellers", sellerSchema), sellerSchema}