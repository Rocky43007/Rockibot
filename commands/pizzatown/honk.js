const Advertiser = require("./models/Advertiser")
async function main(){
    await new Advertiser({
        name:"honk",
        discord_id:"684072236856246338",
        sellers:[]
    }).save()
    console.log("saved")
}

main()