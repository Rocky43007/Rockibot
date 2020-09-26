module.exports = {
  "token": process.env.TOKEN, // https://discordapp.com/developers/applications/ID/bot
  "mongodbUrl": process.env.MONOG_URI, // Mongodb connection url.
  "id": process.env.CLIENTID, // https://discordapp.com/developers/applications/ID/information
  "clientSecret": process.env.CLIENTSECRET, // https://discordapp.com/developers/applications/ID/information
  "domain": "localhost:8080",
};

/**
 * !!!
 * You need to add a redirect url to https://discordapp.com/developers/applications/ID/oauth2.
 * Format is: domain:port/callback example http://localhost:8080/callback
 * - Do not include port if the port is 80.
 * !!!
 */