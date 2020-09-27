const Discord = require('discord.js');//hyprex
const db = require('quick.db')//hyprex
const request = require('request')//hyprex

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.ayarlar.prefix//hyprex
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Lütfen bir bot ID\'i giriniz!').setColor("RED"))//hyprex
    }
    request(`https://rmbotlist.glitch.me/bot/${args[0]}`, function (error, response, body) {//hyprex
    if (error) return msg.channel.send('Hata:', error);
    else if (!error) {
      var a = db.fetch(`botlar.${args[0]}.isim`)//hyprex
      var b = db.fetch(`botlar.${args[0]}.id`)//hyprex
      var c = db.fetch(`botlar.${args[0]}.avatar`)//hyprex
      var d = db.fetch(`botlar.${args[0]}.prefix`)//hyprex
      var e = db.fetch(`botlar.${args[0]}.kütüphane`)//hyprex
      var g = db.fetch(`botlar.${args[0]}.kisa_aciklama`)//hyprex
      var h = db.fetch(`botlar.${args[0]}.etiketler`)//hyprex
      if(JSON.parse(body).destek_sunucusu === 'Belirtilmemiş') {//hyprex
        var i = 'Belirtilmemiş'
      } else {
        var i = `[${a} Destek Sunucusu](${JSON.parse(body).destek_sunucusu})`
      }//hyprex
      if(JSON.parse(body).web_sitesi === 'Belirtilmemiş') {
        var j = 'Belirtilmemiş'//hyprex
      } else {
      var j = JSON.parse(body).web_sitesi//hyprex
      }
      if(JSON.parse(body).github === 'Belirtilmemiş')  {//hyprex
        var k = 'Belirtilmemiş'
      } else {
        var k = `[Github](${JSON.parse(body).github})`//hyprex
      }
      var l = JSON.parse(body).sertifika
      var m = JSON.parse(body).durum//hyprex
      var n = JSON.parse(body).oy_sayisi
    }//hyprex
      
      request(`https://rmbotlist.glitch.me/bot`, function (errorr, responsee, bodyy) {
    if (errorr) return msg.channel.send('Hata:', errorr);//hyprex
    else if (!errorr) {
    if (bodyy.includes(args[0])=== false) return msg.reply("Bu ID'de bir bot sistemde bulunmamaktadır!")
    }//hyprex
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")//hyprex
    .setThumbnail(c)//hyprex
    .setTitle(`XiR - Bot Arama`)
    .setDescription(`${a} (${b}) [${n} oy]`, c)//hyprex
    .addField('Prefix', d)
    .addField('Sahip',)
    .addField('Kısa Açıklama', g)
    .addField('Etiketler', h)
    .addField('Sertifika', l)//hyprex
    .addField('Onay Durumu', m)//hyprex
    .addField("Web Sitesi", j)
    .addField('Github', k)//hyprex
    .addField('Destek Sunucusu', i)
    msg.channel.send({embed})//hyprex
  })
};

exports.conf = {
  enabled: false,//hyprex
  guildOnly: false,
  aliases: ['search-bot', 'find-bot', 'botara'],
  permLevel: 0,//hyprex
  kategori: 'genel'
};

exports.help = {//hyprex
  name: 'bot-ara',
  description: 'DiscordBotsTR sistemindeki botları aramanızı sağlar.',
  usage: 'bot-ara [bot id]'
};//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex//hyprex