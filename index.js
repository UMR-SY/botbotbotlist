const Discord = require('discord.js');//hyprex
const client = new Discord.Client();//hyprex
const chalk = require('chalk');//hyprex
const fs = require('fs');//hyprex
const db = require('quick.db');//hyprex
const useful = require('useful-tools');//hyprex
client.ayar = db;//hyprex

client.htmll = require('cheerio');//hyprex
client.useful = useful;//hyprex
client.tags = require('html-tags');//hyprex


client.ayarlar = {
  "prefix": "/",// Botun Prefix1
  "oauthSecret": "secret",// Botun Secreti
	"callbackURL":  "alanadı/callback",// siteismi.glitch.me/callback şeklinde olucak
	"kayıt": "756149142320971889",// Kayıt kanalının id si
  "rapor": "756149142320971889",// Rapor kanalının id si
  "renk": "#D49818"// bunu neden ekledim bende bilmiyorum isterseniz değiştirin
};
client.login("NTOKEN")// Token
process.env = {}
process.env.TOKEN = "TOKEN";// Token


client.yetkililer = ["333636600032526347"]// Yetkililer
client.webyetkililer = ["333636600032526347"]// Yetkililer
client.sunucuyetkililer = ["333636600032526347"]// Yetkililer
client.yetkililer = ["333636600032526347"]// Yetkililer
client.webyetkililer = ["333636600032526347"]// Yetkililer

client.on('ready', async () => {
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {//hyprex
    client.appInfo = await client.fetchApplication();
  }, 60000);
  require("./app.js")(client);//hyprex
  client.user.setActivity(`Bot List`, { type:"PLAYING" })
  console.log(`Şu an ${client.channels.size} kanala, ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyorum!`)//hyprex
});
//hyprex
setInterval(() => {
  if (db.has('botlar') && db.has('kbotlar')) {//hyprex
    for (var i = 0; i < Object.keys(db.fetch('kbotlar')).length; i++) {//hyprex
      for (var x = 0; x < Object.keys(db.fetch('botlar')).length; x++) {
        var bot = Object.keys(db.fetch('botlar'))[x]
        var user = Object.keys(db.fetch('kbotlar'))[i]
        if (db.has(`oylar.${bot}.${user}`)) {
          setTimeout(() => {
            db.delete(`oylar.${bot}.${user}`)
          }, require('ms')(`${client.useful.seg(db.fetch(`oylar.${bot}.${user}`), 6)}h`));
        }
      }
    }//hyprex
  }
}, 10000);

client.on("guildMemberAdd", member => {
  if (member.user.bot) return member.addRole(member.guild.roles.find(r=>r.name==='🤖| Other Bots').id)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();//hyprex
fs.readdir('./komutlar/', (err, files) => {//hyprex
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {//hyprex
    let props = require(`./komutlar/${f}`);//hyprex
    console.log(`Yüklenen komut: ${props.help.name}.`);//hyprex
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {//hyprex
      client.aliases.set(alias, props.help.name);
    });//hyprex
  })//hyprex
});//hyprex
//hyprex
client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith(client.ayarlar.prefix)) return
	var command = message.content.split(' ')[0].slice(client.ayarlar.prefix.length)//hyprex
	var args = message.content.split(' ').slice(1)
	var cmd;//hyprex

	if (client.commands.has(command)) cmd = client.commands.get(command)//hyprex
  if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command))//hyprex

	if (cmd) {//hyprex
    if (cmd.conf.permLevel === 'ozel') //hyprex
      if (client.yetkililer.includes(message.author.id) === false) return message.channel.send("Yetersiz yetki.")//hyprex
    }
		if (cmd.conf.permLevel === 1) {//hyprex
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Yetersiz yetki.")//hyprex
		}
		if (cmd.conf.permLevel === 2) {//hyprex
			if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Yetersiz yetki.")
		}//hyprex
		if (cmd.conf.permLevel === 3) {//hyprex
			if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yetersiz yetki.")
		}//hyprex
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()//hyprex
      var arr = client.yetkililer//hyprex
			if (!arr.includes(message.author.id)) return message.channel.send("Yetersiz yetki.")//hyprex
		}
		if (cmd.conf.enabled === false) {
			message.channel.send("Bu komut devre dışı.")//hyprex
		}
		if (message.channel.type === "dm") {
				message.channel.send("Bu komutu özel mesajlarda kullanamazsın.")//hyprex
		}
		cmd.run(client, message, args)//hyprex
}); 

//hyprex