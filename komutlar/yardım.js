const Discord = require('discord.js');//hyprex

exports.run = async (client, message, args) => {//hyprex
  var embed = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor("Bu Altyapı HypreX Aittir", client.user.avatarURL)  // "" 2 li tırnak yerine Bot ismi yada sunucu ismi
	.setDescription(`

**Bot nasıl ekleyeceğim?**\n[Buraya tıklayarak](https://rmbotlist.glitch.me/botekle) bot ekleyebileceğiniz yere ışınlanabilirsiniz.//hyprex

**Sistemdeki tüm botları nereden görebilirim?**\n[Buraya tıklayarak](http://list.hyprexbotlist.ml/botlar) görebilirsiniz.

**Sertifika ne işe yarar? Nasıl alınır?**\n[Buraya tıklayarak](http://list.hyprexbotlist.ml/sertifika) görebilirsiniz.

**Kullanıcı panelinde neler yapılabilir?**\nKullanıcı panelinde sistemdeki botlarınızın profilini/başvurusunu düzenleyebilir ve botlarınızı sistemden silebilirsiniz.

**By Coded hyprex#0001 | Botu Kodlayan HypreX#0001

`)
  message.channel.send({embed: embed})
  
};

exports.conf = {//hyprex
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
	kategori: 'genel'
}
//hyprex
exports.help = {//hyprex
	name: 'yardım',
	description: 'Sistem hakkında bilgi gösterir.',
	usage: 'yardım'
}//hyprex