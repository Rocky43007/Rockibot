const mongoose = require("mongoose")

const {sellerSchema} = require("./Sellers");

const advertiserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    pizzaTokens:{
        type:Number,
        default:1000,
    },
    sellers:{
        type:[sellerSchema],
        default:[]
    },
    discord_id:{
        type:String
    },
    offices:{
        type:Number,
        default:0
    },
    airTime:{
        type:Number,
        default:0
    },
    tvChannels:{
        type:Number,
        default:0
    },
    employeeProduction:{
        type:Number,
        default:0
    },
    topggVote:{
        type:Boolean,
        default:false
    },
    offices2:{
        type:Number,
        default:1
    },
})

module.exports = mongoose.model("Advertisers", advertiserSchema)