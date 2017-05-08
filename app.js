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

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.text) {
            session.beginDialog('/BotDialog');
        } else {
            next();
        }
    },
    function (session, results) {
        session.beginDialog('/BotDialog', session.userData.text);
    }
]);
bot.dialog('/BotDialog', [
 function (session) {
        builder.Prompts.text(session, 'Hello, what\'s your name?');
    },
 function (session) {
        builder.Prompts.text(session, 'Ron?! Like the Ron Galperin??');
    },
 function (session) {
        builder.Prompts.text(session, 'Oh of course! How can I help you?');
    },
    function (session) {
        builder.Prompts.text(session, 'The limit is $1,000 per transaction and $5,000 per month.');
    },
 function (session) {
        builder.Prompts.text(session, 'Are you serious?');
    },
function (session) {
        builder.Prompts.text(session, 'No, traveling to Arizona has been suspended due to SB 1070 and HB 2162. Please refer to the travel policy 1.8.7 section F for more information.'); 
    },
function (session) {
        builder.Prompts.text(session, 'Is there anything else I can help you with today?');
    },
    function (session) {
        builder.Prompts.text(session, 'You\'re very welcome.');
    },
    function (session, results) {
        session.userData.text = results.response;
        session.endDialog();
    }
]);

// var intents = new builder.IntentDialog();
// bot.dialog('/', intents);

// intents.matches(/^Purchasing Card/i, [
//     function(session) {
//         builder.Prompts.text(session, "The limit is $1000 per transaction and $5,000 per month. Would you like to request an exemption? ")
//     }, 
//     function(session, results) {
//         session.send("Ok.. %s", results.response);
//     }
// ]);

// intents.matches(/^Travel Card/i, [
//     function(session) {
//         builder.Prompts.text(session, "What would you like to know about the travel card?")
//     }, 
//     function(session, results) {
//         session.send("Ok.. %s", results.response);
//     }
// ]);

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
