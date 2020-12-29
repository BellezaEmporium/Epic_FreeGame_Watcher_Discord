// Required consts for the program to work
require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

// Make the bot log in using the token you've put in your .env file
bot.login(TOKEN);

// Send a message to your CMD saying that your bot is ready to go
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// React on epic.freegame message
bot.on('message', msg => {
  if(msg.content === 'epic.freegame') {
    // Fetch data from Epic Games' API
    const body = fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions")
    .then((stock) => {
      // Convert recieved data into JSON
      return stock.json()
    })
    .then(json => {
      // Gather today's date to get our mystery games
      const day = new Date().getDate();
      // Find both today and tomorrow's mystery game (Epic seems to load the next free game data 30 minutes before the game goes free on their store, so both are indicated)
      var todaysfreegame = json.data.Catalog.searchStore.elements.find(it =>
      {
      return it.urlSlug == "december" + day + "mysterygame";
      });
      // Add +1 to get tomorrow's free game
      let info;
      if (json.data.Catalog.searchStore.elements.find(it => {
       it.urlSlug == "december" + (day + 1) + "mysterygame";
      }) !== null)  {
          var tomorrowsfreegame = json.data.Catalog.searchStore.elements.find(it => {
            info = true;
          return it.urlSlug == "december" + (day + 1) + "mysterygame";
          })}
      else {
        info = false;
      }
      // Create links for today's and tomorrow's game (if tomorrow's game isn't Mystery Game lol)
      let todaysgamelink = "https://www.epicgames.com/store/product/" + todaysfreegame.productSlug.replace('/home', '') + "/home";
      if (tomorrowsfreegame !== null) {
      let tomorrowsgamelink = "https://www.epicgames.com/store/product/" + tomorrowsfreegame.productSlug.replace('/home', '') + "/home";
      }
      // Verify if tomorrow's game name has been leaked (so, different from Mystery Game, and send a reply to the user who asked for today's free game)
      if (tomorrowsfreegame.title == "Mystery Game" || info == false){
        msg.reply("Today's free game is " + todaysfreegame.title + " until 5:00 PM UTC+1.\nLink available here : " + todaysgamelink + ".\nNext game isn't leaked yet, you will need to wait !");
        } else {
        msg.reply("Today's free game is " + todaysfreegame.title + " until 5:00 PM UTC+1.\nLink available here : " + todaysgamelink + ".\nNext game is " + tomorrowsfreegame.title + ".\nLink (open at 5:00 PM UTC+1) : " + tomorrowsgamelink);
      }
    });
  }
});