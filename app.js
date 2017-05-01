var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
//=========================================================
// Bot Setup
//=========================================================

var dotenv = require('dotenv');
dotenv.load();
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^Purchasing Card/i, [
    function(session) {
        builder.Prompts.text(session, "The limit is $1000 per transaction and $5,000 per month. Would you like to request an exemption? ")
    }, 
    function(session, results) {
        session.send("Ok.. %s", results.response);
    }
]);

intents.matches(/^Travel Card/i, [
    function(session) {
        builder.Prompts.text(session, "What would you like to know about the travel card?")
    }, 
    function(session, results) {
        session.send("Ok.. %s", results.response);
    }
]);

// bot.dialog('/', [
//   function (session) {
//     builder.Prompts.text(session, 'Hi! What is your name?');
//   },
//   function(session, results) {
//     session.send("Hello %s! Do you have a question?", results.response);
//   },
//     function(session) {
//     session.beginDialog('/questions');
// }
// ]);


//DvD5Cv4jMys.cwA.cgk.6-Z0LRE6k0DZi3shEp7h3T5t4J4Rg_sXCP5qMAyIkUo

server.get('/', restify.serveStatic({
 directory: "C:\ctrchatbot",
 default: '/index.html'
}));