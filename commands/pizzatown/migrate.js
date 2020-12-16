const {Seller} = require("./models/Sellers")
const Advertiser = require("./models/Advertiser")

Seller.find().then(sellers => {
    sellers.forEach(async seller => {
        if(!seller.collectdate) seller.collectdate = Date.now()
        if(!seller.bathrooms) seller.bathrooms = 0
        if(!seller.sodaMachine) seller.sodaMachine = 0
        if(!seller.toppingBar) seller.toppingBar = 0
        if(!seller.playPlace) seller.playPlace = 0
        if(!seller.reviewScore) seller.reviewScore = 0
        await seller.save()
    })
    

})

Advertiser.find().forEach(advertisers => {
    advertisers.forEach(async advertiser => {
        if(!advertiser.offices) advertiser.offices = 0
        if(!advertiser.broadcastingTime) advertiser.broadcastingTime = 0
        await advertiser.save()
    })
})