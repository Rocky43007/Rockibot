// Load Node modules

var express = require('express');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.js")
client.login(config.token);
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(8082);
// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
        const members = client.guilds.cache.reduce((p, c) => p + c.memberCount, 0);
        const textChannels = client.channels.cache.size;
        const guilds = client.guilds.cache.size;
        res.render("pages/index.ejs", {
          stats: {
            servers: guilds,
            members: members,
            text: textChannels,
          }
        });
    });
app.get('/commands', function (req, res) {
    res.render('pages/commands.ejs');
});
app.get('/about', function (req, res) {
  res.render('pages/commingsoon.ejs');
});
app.get('/tutorials', function (req, res) {
  res.render('pages/commingsoon.ejs');
});
app.get('/server-settings', function (req, res) {
  res.render('pages/commingsoon.ejs');
});
app.get('/login', function (req, res) {
  res.render('pages/commingsoonfeature.ejs');
});
app.use(function(req, res, next){
	res.status(404).render('pages/404.ejs');
	res.status(403).render('pages/403.ejs');
});
