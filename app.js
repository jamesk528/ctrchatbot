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

bot.dialog('/', [
  function (session) {
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  function(session, results) {
    session.send("Hello %s! Do you have a question?", results.response);
}
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
