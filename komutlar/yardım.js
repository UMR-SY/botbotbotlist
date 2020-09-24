const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  var embed = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor("Doxy", client.user.avatarURL)  // "" 2 li tırnak yerine Bot ismi yada sunucu ismi
	.setDescription(`

**Bot nasıl ekleyeceğim?**\n[Buraya tıklayarak](https://rmbotlist.glitch.me/botekle) bot ekleyebileceğiniz yere ışınlanabilirsiniz.

**Sistemdeki tüm botları nereden görebilirim?**\n[Buraya tıklayarak](http://list.hyprexbotlist.ml/botlar) görebilirsiniz.

**Sertifika ne işe yarar? Nasıl alınır?**\n[Buraya tıklayarak](http://list.hyprexbotlist.ml/sertifika) görebilirsiniz.

**Kullanıcı panelinde neler yapılabilir?**\nKullanıcı panelinde sistemdeki botlarınızın profilini/başvurusunu düzenleyebilir ve botlarınızı sistemden silebilirsiniz.

`)
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	name: 'yardım',
	description: 'Sistem hakkında bilgi gösterir.',
	usage: 'yardım'
}