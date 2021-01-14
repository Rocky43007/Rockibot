const mongoose = require("mongoose")
const schannelSchema = new mongoose.Schema({
    guildname:{
        type:String
    },
    channel:{
        type:String
    },
    suggestnum:{
        type:Number,
        default:1
    }
})

module.exports = mongoose.model("schanneldbs", schannelSchema)
// this exports the model, import it with require, that is where you get access to a bunch of cool stuff like find or findOne
// await new Model({data2:"i love stuff", data1:"hi"}).save()