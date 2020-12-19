require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if(msg.content === 'epic.freegame') {
    const body = fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR")
    .then((stock) => {
    return stock.json()
    }).then(json => {
    var freeGame = json.data.Catalog.searchStore.elements[0].title;
    msg.reply("Today's free game is " + freeGame + "\nGo get it when you can !")
    });
  }
});