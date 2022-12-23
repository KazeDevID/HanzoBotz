const fs = require('fs')
const chalk = require('chalk')

global.APIs = {
	// No Apikey 
}

global.APIKeys = {
	// No apikey 
}

// Other

global.namabot = ['HanzoBotz']
global.namaowner = ['Lord Kaze']
global.owner = ['6282217590187']
global.premium = ['6282217590187']
global.Log = '\n『々Lord』KAZE☆☆☆'//console log gerak nya:v
global.packname = '© Powered By'
global.author = 'HanzoBotz || Kaze'
global.sessionName = 'session'
global.prefa = ['','!','.','🐦','🐤','🗿']
global.prefix = ['']
global.symbol1 = '•'
global.symbol2 = '>'
global.wm = '© HanzoBotz made by KazeDevID'
global.mess = {
    success: 'Success ✓',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Khusus Group Chat',
    private: 'Fitur Khusus Private Chat!',
    bot: 'Fitur Khusus Nomor Bot',
    wait: 'Waittt...',
    notregist: 'Kamu belum terdaftar di database bot silahkan daftar terlebih dahulu',
    premium: 'Kamu Bukan User Premium, Beli Sana Ke Owner Bot',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Pukul 00:00 WIB.'
}

global.anticalltext = `Sistem Otomatis Block!!!\nJangan Menelpon Bot!!!\nSilahkan Hubungi Owner Untuk Dibuka!!!`
global.jbtextscan = 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 30 detik'


global.limitawal = {
	free: "100",
        premium: "unlimited"
}
global.thumb = fs.readFileSync('./media/img/kaze.png')
global.qris = { url: 'https://i.ibb.co/jZc69j4/kaze.jpg' }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.greenBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
