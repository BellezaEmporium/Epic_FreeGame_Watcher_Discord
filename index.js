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
      var date = new Date();
      var day  = date.getDate();
      var nextDay = day + 1;
      var constructedDate = "december" + day + "mysterygame";
      var constructedTDate = "december" + nextDay + "mysterygame";
      var todaysfreegame = json.data.Catalog.searchStore.elements.find(it =>
      {
      return it.urlSlug == constructedDate;
      });
      var tomorrowsfreegame = json.data.Catalog.searchStore.elements.find(it =>
      {
      return it.urlSlug == constructedTDate;
      });
      var freeGame = todaysfreegame.title;
      var productSlug = todaysfreegame.customAttributes.find(it =>
      {
      return it.key == 'com.epicgames.app.productSlug';
      });
      var nextGame = tomorrowsfreegame.title;
      var nextproductSlug = tomorrowsfreegame.customAttributes.find(it =>
      {
      return it.key == 'com.epicgames.app.productSlug';
      });
      var trimmedPSlug = productSlug.value.replace('/home', '');
      var trimmedNPSlug = nextproductSlug.value.replace('/home', '');
      var link = "https://www.epicgames.com/store/product/" + trimmedPSlug + "/home"
      var otlink = "https://www.epicgames.com/store/product/" + trimmedNPSlug + "/home"
      if(nextGame == "Mystery Game"){
        msg.reply("Today's free game is " + freeGame + " until 5:00 PM UTC+1.\nLink available here : " + link + ".\nNext game isn't leaked yet, you will need to wait !")
      }
      else {
        msg.reply("Today's free game is " + freeGame + " until 5:00 PM UTC+1.\nLink available here : " + link + ".\nNext game is " + nextGame + ".\nLink (open at 5:00 PM UTC+1) : " + otlink)
      }
    });
  }
});