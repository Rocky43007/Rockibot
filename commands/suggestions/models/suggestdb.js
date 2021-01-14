const mongoose = require("mongoose")
const suggestdbSchema = new mongoose.Schema({
    messageid:{
        type:String
    },
    author:{
        type:String
    },
    authorim:{
        type:String
    },
    suggestion:{
        type:String
    },
    suggestnum:{
        type:Number
    },
    guildname:{
        type:String
    }
})

module.exports = mongoose.model("suggestdbs", suggestdbSchema)
// this exports the model, import it with require, that is where you get access to a bunch of cool stuff like find or findOne
// await new Model({data2:"i love stuff", data1:"hi"}).save()