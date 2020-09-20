const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db');
const useful = require('useful-tools');
client.ayar = db;

client.htmll = require('cheerio');
client.useful = useful;
client.tags = require('html-tags');


client.ayarlar = {
  "prefix": "/",// Botun Prefix1
  "oauthSecret": "Fsv7EouDfnLiRNXW4t7sgtnJBv32KAtW",// Botun Secreti
	"callbackURL":  "http://list.hyprexbotlist.ml/callback",// siteismi.glitch.me/callback şeklinde olucak
	"kayıt": "755105588567867504",// Kayıt kanalının id si
  "rapor": "755105588567867504",// Rapor kanalının id si
  "renk": "#D49818"// bunu neden ekledim bende bilmiyorum isterseniz değiştirin
};
client.login("NzU2OTU4NjgyODc2NjA4Njk0.X2ZatQ.d6LtnNyV4TqtRpOwJwUwjwA28EY")// Token
process.env = {}
process.env.TOKEN = "NzU2OTU4NjgyODc2NjA4Njk0.X2ZatQ.d6LtnNyV4TqtRpOwJwUwjwA28EY";// Token


client.yetkililer = ["333636600032526347"]// Yetkililer
client.webyetkililer = ["333636600032526347"]// Yetkililer
client.sunucuyetkililer = ["333636600032526347"]// Yetkililer
client.yetkililer = ["333636600032526347"]// Yetkililer
client.webyetkililer = ["333636600032526347"]// Yetkililer

client.on('ready', async () => {
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  require("./app.js")(client);
  client.user.setActivity(`Bot List`, { type:"PLAYING" })
  console.log(`Şu an ${client.channels.size} kanala, ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyorum!`)
});

setInterval(() => {
  if (db.has('botlar') && db.has('kbotlar')) {
    for (var i = 0; i < Object.keys(db.fetch('kbotlar')).length; i++) {
      for (var x = 0; x < Object.keys(db.fetch('botlar')).length; x++) {
        var bot = Object.keys(db.fetch('botlar'))[x]
        var user = Object.keys(db.fetch('kbotlar'))[i]
        if (db.has(`oylar.${bot}.${user}`)) {
          setTimeout(() => {
            db.delete(`oylar.${bot}.${user}`)
          }, require('ms')(`${client.useful.seg(db.fetch(`oylar.${bot}.${user}`), 6)}h`));
        }
      }
    }
  }
}, 10000);

client.on("guildMemberAdd", member => {
  if (member.user.bot) return member.addRole(member.guild.roles.find(r=>r.name==='🤖| Other Bots').id)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  })
});

client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith(client.ayarlar.prefix)) return
	var command = message.content.split(' ')[0].slice(client.ayarlar.prefix.length)
	var args = message.content.split(' ').slice(1)
	var cmd;

	if (client.commands.has(command)) cmd = client.commands.get(command)
  if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command))

	if (cmd) {
    if (cmd.conf.permLevel === 'ozel') 
      if (client.yetkililer.includes(message.author.id) === false) return message.channel.send("Yetersiz yetki.")
    }
		if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Yetersiz yetki.")
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Yetersiz yetki.")
		}
		if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yetersiz yetki.")
		}
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()
      var arr = client.yetkililer
			if (!arr.includes(message.author.id)) return message.channel.send("Yetersiz yetki.")
		}
		if (cmd.conf.enabled === false) {
			message.channel.send("Bu komut devre dışı.")
		}
		if (message.channel.type === "dm") {
				message.channel.send("Bu komutu özel mesajlarda kullanamazsın.")
		}
		cmd.run(client, message, args)
}); 