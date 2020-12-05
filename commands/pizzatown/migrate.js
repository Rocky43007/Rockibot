const {Seller} = require("./models/Sellers")

Seller.find().then(sellers => {
    sellers.forEach(async seller => {
        if(!seller.collectdate) seller.collectdate = Date.now()
        if(!seller.bathrooms) seller.bathrooms = 0
        if(!seller.sodaMachine) seller.sodaMachine = 0
        if(!seller.toppingBar) seller.toppingBar = 0
        if(!seller.playPlace) seller.playPlace = 0
        await seller.save()
    })
})