// Required consts for the program to work
require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Discord.Client();
const TOKEN = process.env['TOKEN'];

// Make the bot log in using the token you've put in your .env file
bot.login(TOKEN);

// Send a message to your CMD saying that your bot is ready to go
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// React on epic.freegame message
bot.on('message', msg => {
  const args = msg.content.slice(process.env.PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if(command === '.games') {
    // GraphQL body
    const query = {"query":"query searchStoreQuery($allowCountries: String, $category: String, $count: Int, $country: String!, $keywords: String, $locale: String, $namespace: String, $itemNs: String, $sortBy: String, $sortDir: String, $start: Int, $tag: String, $releaseDate: String, $withPrice: Boolean = false, $withPromotions: Boolean = false, $priceRange: String, $freeGame: Boolean, $onSale: Boolean, $effectiveDate: String) {\n  Catalog {\n    searchStore(\n      allowCountries: $allowCountries\n      category: $category\n      count: $count\n      country: $country\n      keywords: $keywords\n      locale: $locale\n      namespace: $namespace\n      itemNs: $itemNs\n      sortBy: $sortBy\n      sortDir: $sortDir\n      releaseDate: $releaseDate\n      start: $start\n      tag: $tag\n      priceRange: $priceRange\n      freeGame: $freeGame\n      onSale: $onSale\n      effectiveDate: $effectiveDate\n    ) {\n      elements {\n        title\n        id\n        namespace\n        description\n        effectiveDate\n        keyImages {\n          type\n          url\n        }\n        currentPrice\n        seller {\n          id\n          name\n        }\n        productSlug\n        urlSlug\n        url\n        tags {\n          id\n        }\n        items {\n          id\n          namespace\n        }\n        customAttributes {\n          key\n          value\n        }\n        categories {\n          path\n        }\n        price(country: $country) @include(if: $withPrice) {\n          totalPrice {\n            discountPrice\n            originalPrice\n            voucherDiscount\n            discount\n            currencyCode\n            currencyInfo {\n              decimals\n            }\n            fmtPrice(locale: $locale) {\n              originalPrice\n              discountPrice\n              intermediatePrice\n            }\n          }\n          lineOffers {\n            appliedRules {\n              id\n              endDate\n              discountSetting {\n                discountType\n              }\n            }\n          }\n        }\n        promotions(category: $category) @include(if: $withPromotions) {\n          promotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n          upcomingPromotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n        }\n      }\n      paging {\n        count\n        total\n      }\n    }\n  }\n}\n","variables":{"category":"games/edition/base|bundles/games|editors|software/edition/base","count": 100,"country":"FR","keywords":"","locale":"fr","sortBy":"releaseDate","sortDir":"DESC","allowCountries":"FR","start":0,"tag":"","freeGame":true,"withPrice":true,"withMapping": true}}
    // Fetch data from Epic Games' API
    fetch("https://www.epicgames.com/graphql", {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {'Content-Type': 'application/json'}
    })
    .then((stock) => {
      // Convert recieved data into JSON
      return stock.json()
    })
    .then(json => {
      const games = [];
      for(let i = 0; i < Object.keys(json.data.Catalog.searchStore.elements).length; i++){
        games.push(json.data.Catalog.searchStore.elements[i].title);
      }
      const allGamesInOne = games.join('\n ');
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Epic free games, as of ' + date.toString())
        .setURL('https://www.epicgames.com/store/browse?sortBy=releaseDate&sortDir=DESC&priceTier=tierFree&pageSize=30')
        .setAuthor('Epic Games Watcher', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png', 'https://www.epicgames.com/')
        .setDescription(allGamesInOne)
        .setThumbnail('https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png')
        .setTimestamp()
        .setFooter('Bot made by LaneSh4d0w', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png');

      msg.reply(exampleEmbed);
    });
  } else if (command === ".search") {
    if (!args.length) {
      msg.reply("you didn't provide any name !")
    }
    else {
       const request_body = {"query":"query searchStoreQuery($allowCountries: String, $category: String, $count: Int, $country: String!, $keywords: String, $locale: String, $namespace: String, $itemNs: String, $sortBy: String, $sortDir: String, $start: Int, $tag: String, $releaseDate: String, $withPrice: Boolean = false, $withPromotions: Boolean = false, $priceRange: String, $freeGame: Boolean, $onSale: Boolean, $effectiveDate: String) {\n  Catalog {\n    searchStore(\n      allowCountries: $allowCountries\n      category: $category\n      count: $count\n      country: $country\n      keywords: $keywords\n      locale: $locale\n      namespace: $namespace\n      itemNs: $itemNs\n      sortBy: $sortBy\n      sortDir: $sortDir\n      releaseDate: $releaseDate\n      start: $start\n      tag: $tag\n      priceRange: $priceRange\n      freeGame: $freeGame\n      onSale: $onSale\n      effectiveDate: $effectiveDate\n    ) {\n      elements {\n        title\n        id\n        namespace\n        description\n        effectiveDate\n        keyImages {\n          type\n          url\n        }\n        currentPrice\n        seller {\n          id\n          name\n        }\n        productSlug\n        urlSlug\n        url\n        tags {\n          id\n        }\n        items {\n          id\n          namespace\n        }\n        customAttributes {\n          key\n          value\n        }\n        categories {\n          path\n        }\n        price(country: $country) @include(if: $withPrice) {\n          totalPrice {\n            discountPrice\n            originalPrice\n            voucherDiscount\n            discount\n            currencyCode\n            currencyInfo {\n              decimals\n            }\n            fmtPrice(locale: $locale) {\n              originalPrice\n              discountPrice\n              intermediatePrice\n            }\n          }\n          lineOffers {\n            appliedRules {\n              id\n              endDate\n              discountSetting {\n                discountType\n              }\n            }\n          }\n        }\n        promotions(category: $category) @include(if: $withPromotions) {\n          promotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n          upcomingPromotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n        }\n      }\n      paging {\n        count\n        total\n      }\n    }\n  }\n}\n","variables":{"category":"games/edition/base|bundles/games|editors|software/edition/base","keywords":encodeURI(args),"country":"FR","allowCountries":"FR","locale":"fr","sortDir":"DESC","withPrice":true}}

    fetch("https://www.epicgames.com/graphql", {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {'Content-Type': 'application/json'}
    })
    .then((stock) => {
      // Convert recieved data into JSON
      return stock.json()
    })
    .then(json => {
      if (json.data.Catalog.searchStore.elements[0].title === undefined) {
          msg.reply('No product has been found with this name.')
      } else if (json.data.Catalog.searchStore.elements[0].productSlug !== null) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(json.data.Catalog.searchStore.elements[0].title)
        .setURL("https://www.epicgames.com/store/product/" + json.data.Catalog.searchStore.elements[0].productSlug.replace('/home', '') + "/home")
        .setAuthor('Epic Games Watcher', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png', 'https://github.com/LaneSh4d0w/Epic_FreeGame_Watcher_Discord')
        .setDescription('Found your requested product !')
        .setThumbnail(json.data.Catalog.searchStore.elements[0].keyImages[3].url)
        .addFields(
          { name: 'Price', value: json.data.Catalog.searchStore.elements[0].price.totalPrice.fmtPrice.originalPrice},
          { name: 'Developer', value: json.data.Catalog.searchStore.elements[0].seller.name},
        )
        .setTimestamp()
        .setFooter('Bot made by LaneSh4d0w', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png');
        msg.reply(exampleEmbed);
      } else {
         const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(json.data.Catalog.searchStore.elements[0].title)
        .setAuthor('Epic Games Watcher', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png', 'https://github.com/LaneSh4d0w/Epic_FreeGame_Watcher_Discord')
        .setDescription('Found your requested product !')
        .setThumbnail(json.data.Catalog.searchStore.elements[0].keyImages[3].url)
        .addFields(
          { name: 'Price', value: json.data.Catalog.searchStore.elements[0].price.totalPrice.fmtPrice.originalPrice},
          { name: 'Developer', value: json.data.Catalog.searchStore.elements[0].seller.name},
        )
        .setTimestamp()
        .setFooter('Bot made by LaneSh4d0w', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png');
        msg.reply(exampleEmbed);
      }
    });
    }
  } else if (command == ".help") {
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Epic Games Bot Help Command")
        .setAuthor('Epic Games Bot', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png', 'https://github.com/LaneSh4d0w/Epic_FreeGame_Watcher_Discord')
        .setDescription("This bot is made for you to get direct access to Epic's Free Games, by using their GraphQL API.\nCommands are as follows: ")
        .addFields(
          { name: 'search', value: "Usage : <prefix>.search *name of the game*\nSearches for a game from the Epic Games Store."},
          { name: 'games', value: "Usage : <prefix>.games\nShows the actual free games offered on the Epic Games Store to today's date."},
        )
        .setTimestamp()
        .setFooter('Bot made by LaneSh4d0w', 'https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png');
        msg.reply(exampleEmbed);
  }
});