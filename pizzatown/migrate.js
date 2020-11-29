const {Seller} = require("./models/Sellers")

Seller.find().then(sellers => {
    sellers.forEach(async seller => {
        if(!seller.collectdate) seller.collectdate = Date.now()
        await seller.save()
    })
})