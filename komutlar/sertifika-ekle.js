const Discord = require('discord.js');
const db = require('quick.db');//hyprex//hyprex

exports.run = async (client, message, args) => {
	if(!args[0]) return message.channel.send('Bir ID yazmalısın.')
  if(!client.users.has(args[0])) return message.channel.send('Geçersiz ID.')
  if(!client.users.get(args[0]).bot) return message.channel.send('Bu kişi bir bot değil.')
  
	if (db.has('botlar')) {//hyprex
			if (Object.keys(db.fetch('botlar')).includes(args[0]) === false)  return message.reply("ID'ini yazdığın bot sistemde yok.")
	}
  //hyprex//hyprex
  if (db.has('botlar')) {
  if (db.has(`botlar.${args[0]}.sertifika`) === true) return message.reply("Bu ID'e sahip sertifikalı bot zaten var.")
  }
  
  message.channel.send(`Başarıyla \`${args[0]}\` ID'ine sahip \`${db.fetch(`botlar.${args[0]}.isim`)}\` adlı bota sertifika verildi.`)
  client.channels.get(client.ayarlar.kayıt).send(`\`${message.author.tag}\` adlı yetkili tarafından \`${db.fetch(`botlar.${args[0]}.sahip`)}\` adlı kullanıcının \`${args[0]}\` ID'ine sahip \`${db.fetch(`botlar.${args[0]}.isim`)}\` adlı bota sertifika verildi.`)
	//hyprex
  db.set(`botlar.${args[0]}.sertifika`, "Bulunuyor")
  //hyprex
};
//hyprex
exports.conf = {
	enabled: true,//hyprex
	guildOnly: true,
	aliases: ['sertifika-ver'],//hyprex
	permLevel: 'ozel',
	kategori: 'yetkili'
}//hyprex

exports.help = {//hyprex
	name: 'sertifika-ekle',
	description: 'Yazılan ID\'deki botu sertifikalı yapar.',
	usage: 'sertifika-ekle [ID]'//hyprex
}//hyprex//hyprex