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
    const body = fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions")
    .then((stock) => {
    return stock.json()
    }).then(json => {
    var freeGame = json.data.Catalog.searchStore.elements[2].title;
    var pSlugLink = json.data.Catalog.searchStore.elements[2].customAttributes[5].value;
    var nextGame = json.data.Catalog.searchStore.elements[3].title;
    var npSlugLink = json.data.Catalog.searchStore.elements[3].customAttributes[6].value;
    var link = "https://www.epicgames.com/store/product/" + pSlugLink + "/home"
    var otlink = "https://www.epicgames.com/store/product/" + npSlugLink + "/home"
    msg.reply("Today's free game is " + freeGame + " until 5:00 PM UTC+1.\nLink available here : " + link + ".\nNext game is " + nextGame + ".\nLink (open at 5:00 PM UTC+1) : " + otlink)
    });
  }
});