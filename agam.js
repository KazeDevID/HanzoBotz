require('./config.js')

/**
* THANKS TO...
* Adiwajshing (Created Baileys)
* kaze Coding (My Self)
*/

// Module
const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType
} = require('@adiwajshing/baileys')

const fs = require('fs')
const os = require('os')
const speed = require('performance-now')
const axios = require('axios')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const timeZone = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { performance } = require('perf_hooks')
const { JSDOM } = require('jsdom')
const { spawn, exec, execSync } = require("child_process")

// lib
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
const { jadibot, conns } = require('./lib/jadibot')

// Time
const hariini = timeZone.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const barat = timeZone.tz('Asia/Jakarta').format('HH:mm:ss')
const tengah = timeZone.tz('Asia/Makassar').format('HH:mm:ss')
const timur = timeZone.tz('Asia/Jayapura').format('HH:mm:ss')
const youtube = ('https://youtube.com/c/kazeCoding')
const wa = `0@s.whatsapp.net`
const owner = global.owner + '@s.whatsapp.net'
const nyoutube = ('kaze') 
var time = timeZone.tz('Asia/Jakarta')
.format('HH:mm:ss')


let vote = db.data.others.vote = []
let user = JSON.parse(fs.readFileSync('./database/user.json'));

const cekUser = (satu, dua) => { 
let x1 = false
Object.keys(user).forEach((i) => {
if (user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return user[x1].id }
if (satu == "name"){ return user[x1].name }
if (satu == "umur"){ return user[x1].umur }
if (satu == "gender"){ return user[x1].gender }
if (satu == "resi"){ return user[x1].resi }
if (satu == "registerOn"){ return user[x1].registerOn }
}
if (x1 == false) { return null } 
}

module.exports = kaze = async (kaze, m, store, chatUpdate) => {
	try {
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi.test(body) ? body.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi)[0] : "" : prefa ?? global.prefix
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = url = args.join(" ")
const fatkuns = (m.quoted || m)
const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const from = m.chat
const isMedia = /image|video|sticker|audio/.test(m.quoted ? m.quoted.mtype : m.mtype)
const isVideo = (m.quoted ? m.quoted.mtype : m.mtype) == 'videoMessage'
const isImage = (m.quoted ? m.quoted.mtype : m.mtype) == 'imageMessage'
const pushname = m.pushName || "No Name"
const botNumber = await kaze.decodeJid(kaze.user.id)
const isOwner = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const myNumber = m.sender == botNumber ? true : false
const sender = m.isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
//const isRegist = cekUser(sender)

// Group
const groupMetadata = m.isGroup ? await kaze.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isPremium = isOwner || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
    	
    	// Limit
    	try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}

// Afk
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = limitUser
} else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: limitUser,
}
    
let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antilink' in chats)) chats.antilink = true
} else global.db.data.chats[m.chat] = {
mute: false,
antilink: true,
}

// Reset Limit
	let cron = require('node-cron')
	cron.schedule('00 12 * * *', () => {
let user = Object.keys(global.db.data.users)
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
for (let jid of user) global.db.data.users[jid].limit = limitUser
console.log('Reseted Limit')
	}, {
scheduled: true,
timezone: "Asia/Jakarta"
})

	    let setting = global.db.data.settings[botNumber]
if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
	    if (setting) {
if (!isNumber(setting.status)) setting.status = 0
if (!('autobio' in setting)) setting.autobio = true
if (!('templateImage' in setting)) setting.templateImage = true
if (!('templateVideo' in setting)) setting.templateVideo = false
if (!('templateGif' in setting)) setting.templateGif = false
if (!('templateMsg' in setting)) setting.templateMsg = false
if (!('templateLocation' in setting)) setting.templateLocation = false
	    } else global.db.data.settings[botNumber] = {
status: 0,
autobio: true,
templateImage: true,
templateVideo: false,
templateGif: false,
templateMsg: false,
templateLocation: false,
	    }
	    
} catch (err) {
console.error(err)
}


// Sayying time
const hours = timeZone().tz('Asia/Jakarta').format('HH:mm:ss')
if(hours < "23:59:00"){
var sayyingTime = 'Selamat Malam 🌃'
}
if(hours < "19:00:00"){
var sayyingTime = 'Selamat Petang 🌆'
}
if(hours < "18:00:00"){
var sayyingTime = 'Selamat Sore 🌅'
}
if(hours < "15:00:00"){
var sayyingTime = 'Selamat Siang 🏙'
}
if(hours < "10:00:00"){
var sayyingTime = 'Selamat Pagi 🌄'
}
if(hours < "05:00:00"){
var sayyingTime = 'Selamat Subuh 🌉'
}
if(hours < "03:00:00"){
var sayyingTime = 'Selamat Tengah Malam 🌌'
}
	// auto set bio
	if (db.data.settings[botNumber].autobio) {
	    let setting = global.db.data.settings[botNumber]
	    if (new Date() * 1 - setting.status > 1000) {
let uptime = await runtime(process.uptime())
await kaze.setStatus(`${global.namabot} | Runtime : ${runtime(process.uptime())}`)
setting.status = new Date() * 1
	    }
	}
	
	// Respon Cmd with media
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
userJid: kaze.user.id,
quoted: ftroli.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, kaze.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
kaze.ev.emit('messages.upsert', msg)
}

// Public & Self
if (!kaze.public) {
if (!m.key.fromMe) return
}

// Push Message To Console && Auto Read
if (m.message) {
kaze.readMessages([m.key])
console.log(chalk.black(chalk.bgGreen('[ Chat ]')), chalk.black(chalk.blueBright(new Date)), chalk.black(chalk.greenBright(budy || m.mtype)) + '\n' + chalk.magentaBright('- from'), chalk.blueBright(pushname), chalk.greenBright(m.sender) + '\n' + chalk.blueBright('- in'), chalk.cyanBright(m.isGroup ? pushname : 'Private Chat', m.chat))
}

// Hit
        global.hit = {}
		if (isCmd) {
		data = await fetchJson('https://api.countapi.xyz/hit/nonton-gratis.netlify.app/visitor')
		totalcmd = `${data.value}`
		
	}


const reSize = async(buffer, ukur1, ukur2) => {
 return new Promise(async(resolve, reject) => {
 let jimp = require('jimp')
 var baper = await jimp.read(buffer);
 var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
 resolve(ab)
 })
 }
 
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 99999,status: 200, thumbnail: await reSize(thumb, 100, 100), surface: 200, message: global.wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: global.wm,jpegThumbnail: await reSize(thumb, 100, 100)}}}
const fvn = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":359996400,"ptt": "true"}} } 
const ftextt = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})}, message: { "extendedTextMessage": {"text":global.wm, "title": `${namabot}`, 'jpegThumbnail': await reSize(thumb, 100, 100)}}}
const ftoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast" } : {})}, message: { "productMessage": { "product": { "productImage":{ "mimetype": "image/jpeg", "jpegThumbnail": await reSize(thumb, 100, 100)},"title": global.wm, "description": `${namabot}`, "currencyCode": "IDR", "priceAmount1000": "1000000000000000000", "retailerId": global.wm, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}} 
const fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title":global.wm, "h": `Hmm`,'seconds': '359996400', 'gifPlayback': 'true', 'caption': global.wm, 'jpegThumbnail': await reSize(thumb, 100, 100)}}}
const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": global.wm, "caption": global.wm, 'jpegThumbnail': await reSize(thumb, 100, 100)}}}
const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": { "title":global.wm, "h": `Hmm`,'seconds': '359996400', 'caption': global.wm, 'jpegThumbnail': await reSize(thumb, 100, 100)}}}
const floc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: global.wm,jpegThumbnail: await reSize(thumb, 100, 100)}}}
const floc2 = {key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) }, message: { "liveLocationMessage": { "title": global.wm,"h": `Hmm`, 'jpegThumbnail': await reSize(thumb, 100, 100)}}}
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': global.wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ytname,;;;\nFN:ytname\nitem1.TEL;waid=6282217590187:6282217590187\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': await reSize(thumb, 100, 100), thumbnail: await reSize(thumb, 100, 100),sendEphemeral: true}}}
	    const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc","mimetype": "image/jpeg","caption": global.wm,"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": await reSize(thumb, 100, 100),"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
 
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
  }
  
// End
switch(command) {

// Start Cmd
case 'daftar':
case 'registrasi':
case 'register':
case 'registered':
case 'regis':{
let mm = args.join(' ')
let m1 = mm.split("|")[0];
let m2 = mm.split("|")[1];
let m3 = mm.split("|")[2];
if (m.isGroup) {
m.reply('🇮🇩 _Bot telah mengirimkan list pendaftaran ke private chat, silahkan selesaikan agar dapat menggunakan fitur bot._\n\n🇺🇸 _The bot has sent a registration list to the private chat, please complete it so you can use the bot feature._')
if (!m2) return kaze.sendMessage(sender, { text: `🇮🇩 _Hi @${sender.split("@")[0]} silahkan pilih umur kamu dengan cara pencet dibawah ini._\n\n🇺🇸 _Hi @${sender.split("@")[0]} please select your age by pressing the button below._`, footer: `${namabot} © 2022`, buttonText: "Click Here", sections: [{title: "📆Select Your Age Here!!", rows: [{title: "🎰 Random Years", rowId: "#daftar "+pushname+"|"+pickRandom(["5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50",",51","52","53","54","55","56","57","58","59","60"])},{title: "💫60• Years", rowId: "#daftar "+pushname+"|"+"60"},{title: "💫59• Years", rowId: "#daftar "+pushname+"|"+"59"},{title: "💫58• Years", rowId: "#daftar "+pushname+"|"+"58"},{title: "💫57• Years", rowId: "#daftar "+pushname+"|"+"57"},{title: "💫56• Years", rowId: "#daftar "+pushname+"|"+"56"},{title: "💫55• Years", rowId: "#daftar "+pushname+"|"+"56"},{title: "💫54• Years", rowId: "#daftar "+pushname+"|"+"54"},{title: "💫53• Years", rowId: "#daftar "+pushname+"|"+"53"},{title: "💫52• Years", rowId: "#daftar "+pushname+"|"+"52"},{title: "💫51• Years", rowId: "#daftar "+pushname+"|"+"51"},{title: "💫50• Years", rowId: "#daftar "+pushname+"|"+"50"},{title: "💫49• Years", rowId: "#daftar "+pushname+"|"+"49"},{title: "💫48• Years", rowId: "#daftar "+pushname+"|"+"48"},{title: "💫47• Years", rowId: "#daftar "+pushname+"|"+"47"},{title: "💫46• Years", rowId: "#daftar "+pushname+"|"+"46"},{title: "💫45• Years", rowId: "#daftar "+pushname+"|"+"45"},{title: "💫44• Years", rowId: "#daftar "+pushname+"|"+"44"},{title: "💫43• Years", rowId: "#daftar "+pushname+"|"+"43"},{title: "💫42• Years", rowId: "#daftar "+pushname+"|"+"42"},{title: "💫41• Years", rowId: "#daftar "+pushname+"|"+"41"},{title: "💫40• Years", rowId: "#daftar "+pushname+"|"+"40"},{title: "💫39• Years", rowId: "#daftar "+pushname+"|"+"39"},{title: "💫38• Years", rowId: "#daftar "+pushname+"|"+"38"},{title: "💫37• Years", rowId: "#daftar "+pushname+"|"+"37"},{title: "💫36• Years", rowId: "#daftar "+pushname+"|"+"36"},{title: "💫35• Years", rowId: "#daftar "+pushname+"|"+"35"},{title: "💫34• Years", rowId: "#daftar "+pushname+"|"+"34"},{title: "💫33• Years", rowId: "#daftar "+pushname+"|"+"33"},{title: "💫32• Years", rowId: "#daftar "+pushname+"|"+"32"},{title: "💫31• Years", rowId: "#daftar "+pushname+"|"+"31"},{title: "💫30• Years", rowId: "#daftar "+pushname+"|"+"30"},{title: "💫29• Years", rowId: "#daftar "+pushname+"|"+"39"},{title: "💫28• Years", rowId: "#daftar "+pushname+"|"+"28"},{title: "💫27• Years", rowId: "#daftar "+pushname+"|"+"27"},{title: "💫26• Years", rowId: "#daftar "+pushname+"|"+"26"},{title: "💫25• Years", rowId: "#daftar "+pushname+"|"+"25"},{title: "💫24• Years", rowId: "#daftar "+pushname+"|"+"24"},{title: "💫23• Years", rowId: "#daftar "+pushname+"|"+"23"},{title: "💫22• Years", rowId: "#daftar "+pushname+"|"+"22"},{title: "💫21• Years", rowId: "#daftar "+pushname+"|"+"21"},{title: "💫20• Years", rowId: "#daftar "+pushname+"|"+"20"},{title: "💫19• Years", rowId: "#daftar "+pushname+"|"+"19"},{title: "💫18• Years", rowId: "#daftar "+pushname+"|"+"18"},{title: "💫17• Years", rowId: "#daftar "+pushname+"|"+"17"},{title: "💫16• Years", rowId: "#daftar "+pushname+"|"+"16"},{title: "💫15• Years", rowId: "#daftar "+pushname+"|"+"15"},{title: "💫14• Years", rowId: "#daftar "+pushname+"|"+"14"},{title: "💫13• Years", rowId: "#daftar "+pushname+"|"+"13"},{title: "💫12• Years", rowId: "#daftar "+pushname+"|"+"12"},{title: "💫11• Years", rowId: "#daftar "+pushname+"|"+"11"},{title: "💫10• Years", rowId: "#daftar "+pushname+"|"+"10"},{title: "💫9• Years", rowId: "#daftar "+pushname+"|"+"9"},{title: "💫8• Years", rowId: "#daftar "+pushname+"|"+"8"},{title: "💫7• Years", rowId: "#daftar "+pushname+"|"+"7"},{title: "💫6• Years", rowId: "#daftar "+pushname+"|"+"6"},{title: "💫5• Years", rowId: "#daftar "+pushname+"|"+"5"}]}], mentions: [`${sender}`]}, { quoted: ftroli })
}
if (!m1) return m.reply(`Ex : ${prefix+command} Nama|umur`)
if (m1 && !m2 && !m3) {
user.push({id: sender, name: m1})
fs.writeFileSync('./database/user.json', JSON.stringify(user))
}
if (m1 && m2 && !m3) {
user.push({id: sender, name: m1, umur: m2})
fs.writeFileSync('./database/user.json', JSON.stringify(user))
}
if (!m3) return kaze.sendMessage(sender, { text: `🇮🇩 _Hi @${sender.split("@")[0]} silahkan pilih jenis kelamin kamu dengan cara pencet dibawah ini._\n\n🇺🇸 _Hi @${sender.split("@")[0]} please select your gender by pressing the button below._`, footer: global.wm, buttonText: "Click Here", sections: [{title: "♂Select Your Gender Here!!", rows: [{title: "♂ Male / Cowo", rowId: "#daftar "+pushname+"|"+cekUser("umur", sender)+"|"+pickRandom(["Laki-Laki","Cowo","Pria"])},{title: "♀ Female / Cewe", rowId: "#daftar "+pushname+"|"+cekUser("umur", sender)+"|"+pickRandom(["Perempuan","Cewe","Wanita"])}]}], mentions: [`${sender}`]}, { quoted: fkontak })
if (m1 && m2 && m3) {
user.push({id: sender, name: m1, umur: m2, gender: m3})
fs.writeFileSync('./database/user.json', JSON.stringify(user))
}
try {
ppuser = await kaze.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://tinyurl.com/yx93l6da'
}
const nomor_resi = require("crypto").randomBytes(5).toString("hex").toUpperCase()
let resiNya = `${nomor_resi}`
let registerOnNya = `${hariini}`
let teks_daftar =`*──────❲ VERIFIKASI SUKSES ❳──────*
*Nama :* ${m1}
*Umur :* ${m2} Tahun
*Gender :* ${m3}
*Resi :* ${resiNya}
*Register On :* ${registerOnNya}
*Nomor :* ${sender.split('@')[0]}
*Status :* ${isOwner? 'Owner':'User'} ${namabot}
*User Ke :* ${user.length}

Silahkan ketik *#rules* sebelum memulai bot.`
if (m1 && m2 && m3) {
user.push({id: sender, name: m1, umur: m2, gender: m3, resi: resiNya, registerOn: registerOnNya})
fs.writeFileSync('./database/user.json', JSON.stringify(user))
kaze.sendMessage(sender, { text: `*Memuat Data* › @${sender.split('@')[0]}`, mentions: [ `${sender.split('@')[0]}@s.whatsapp.net` ]}, { quoted: m })
kaze.sendMessage(sender, { image: { url: ppuser }, caption: teks_daftar }, { quoted: m }) 
}
}
break

// Owner
case 'author': case 'owner': case 'creator': {
kaze.sendContact(m.chat, global.owner, m)
}
break

case 'tqto': case 'thanksto': case 'contributor': {
let tqto = `
*THANKS TO*`
let tag = `
@Adiwajshing (Baileys)
@KazeDevID (base)
`
      	  let buttons = [
    {buttonId: `rules`, buttonText: {displayText: 'Rules'}, type: 1},
    {buttonId: `donasi`, buttonText: {displayText: 'Donasi'}, type: 1},
    {buttonId: `owner`, buttonText: {displayText: 'Owner'}, type: 1}
]
let buttonMessage = {
    image: { url: 'https://i.ibb.co/jZc69j4/kaze.jpg' },
    caption: `${tqto}`,
    footer: `${tag}\n\n${global.wm}`,
    buttons: buttons,
    headerType: 4
}
kaze.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break

case 'menu': case 'help': case 'm': {
let me = m.sender
let menu = `
┏──────────────⭓
┆ Hᴀʟᴏ ${pushname} ${sayyingTime}*
┆
┢╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╼
┢ *INFO USER*
┆Number: @${me.split('@')[0]}
┆Premium: ${isPremium ? '✅' : `❌`}
┆Limit: ${isPremium ? 'Unlimited' : `${db.data.users[m.sender].limit}`}
┆
┢╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╼
┢ *INFO BOT*
┆Nama Bot: ${global.namabot}
┆Owner: @${owner.split('@')[0]}
┆Mode: ${kaze.public ? 'Public' : `Self`}
┆Prefix:「 MULTI-PREFIX 」
┆Total Hit: ${totalcmd}
┆Hit Today: ${totalcmd}
┆
┢╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╼
┢ *INFO CMD*
┆💰 = Premium
┆🔖 = Free
┆🎟️ = Limit
┆👑 = Owner
┆
┢╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╼
┢ *TIME*
┆Date: ${hariini}
┆Wib: ${barat} WIB
┆Wita: ${tengah} WITA
┆Wit: ${timur} WIT
┆
┣╌ ⟪ *MAIN CMD* ⟫
┃▷ ${prefix}runtime
┃▷ ${prefix}testspeed
┃▷ ${prefix}rules
┃▷ ${prefix}ping
┃▷ ${prefix}tqto
┃▷ ${prefix}owner
┃▷ ${prefix}register
┃▷ ${prefix}request
┃▷ ${prefix}donasi
┃▷ ${prefix}del
┃▷ ${prefix}ceklimit
┃▷ ${prefix}hit
┃
┣╌ ⟪ *OWNER CMD* ⟫
┃▷ ${prefix}self 👑
┃▷ ${prefix}public 👑
╰──────────────⊱
`
      	  let buttons = [
    {buttonId: `rules`, buttonText: {displayText: 'Rules'}, type: 1},
    {buttonId: `donasi`, buttonText: {displayText: 'Donasi'}, type: 1},
    {buttonId: `owner`, buttonText: {displayText: 'Owner'}, type: 1}
]
let buttonMessage = {
    image: fs.readFileSync(`./media/img/kaze.png`),
    caption: `${menu}`,
    footer: wm,
    buttons: buttons,
    headerType: 4
}
kaze.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
rvn = fs.readFileSync(`./media/audio/menu.mp3`)
kaze.sendMessage(m.chat, { audio: rvn, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
break

// Main
case 'runtime': case 'tes': {
let lowq = `*Bot Telah Online Selama*\n*${runtime(process.uptime())}*`
let buttons = [{ buttonId: 'donasi', buttonText: { displayText: 'Donasi' }, type: 1 }]
await kaze.sendButtonText(m.chat, buttons, lowq, nyoutube, m, {quoted: fkontak})
	}
break

case 'ping': {
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
}, {
    speed: 0,
    total: 0,
    times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
m.reply(respon)
}
break

case 'testspeed': case 'speedtest': {
m.reply('Testing Speed...')
let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
  let o
  try {
  o = await exec('python tspeed.py')
  } catch (e) {
  o = e
 } finally {
let { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
if (stderr.trim()) m.reply(stderr)
}
}
break

case 'rules': {
let rules = `
*RULES*`
let rulesnya = `
1. Jangan Pernah Spam Bot
2. Jangan Call Nomer Bot
3. Jangan Mengeksploitasi Bot

Sanksi : *Warn/Soft Block*

*About Questions*

You : Bot Nya Slow Respon
Bot : Mohon Bersabar, Mungkin
Kendala Dari Jaringan, Signal,
Atau Bahkan Terbanned Dari
Pihak WhatsApp

You : Dapet Script Nya Dimana?
Bot : https://wa.me/6282217590187

You : Boleh Masukin Ke Grup Saia
Tidak?
Bot : Untuk Masalah Memasukkan
Bot Ke Dalam Grup Bisa
Menghubungi Owner

You: Apakah Bot Ini Masih
Menyimpan File Yang Saya Kirim?
Bot : Data WhatsApp Anda Hanya
Tersimpan Saat Bot Aktif, Dan Bot
Tidak Pernah Menyimpan File-file
Yang Anda Kirim

You : Min, Ada Fitur Yang Error
Bot : Jika Menemukan Bug/Error
Silahkan Langsung Hubungi
Owner/Creator Agar Segera Di Fix

Tetap Patuhi Rules Agar Tetap
Bisa Menikmati Bot

*Note* : Segala Ketentuan Dan
Kebijakan Yang Berlaku Di Pegang
Oleh Owner Bot, Sewaktu-Waktu
Owner Berhak Memakai Ataupun
Mengubah Kebijakan Dan
Ketentuan Yang Berlaku

*Thanks* Buat Kalian
User-User Yang Sudah Memakai Bot,
Yang Sudah Mau Mematuhi
Rules, Serta Para Constributor
Yang Sudah Membantu Dalam
Pembuatan Bot Ini
Ini`
      	  let buttons = [
    {buttonId: `menu`, buttonText: {displayText: 'Menu'}, type: 1},
    {buttonId: `donasi`, buttonText: {displayText: 'Donasi'}, type: 1},
    {buttonId: `tqto`, buttonText: {displayText: 'Thanks To'}, type: 1}
]
let buttonMessage = {
    image: { url: 'https://i.ibb.co/jZc69j4/kaze.jpg' },
    caption: `${rules}`,
    footer: `${rulesnya}\n\n${global.wm}`,
    buttons: buttons,
    headerType: 4
}
kaze.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
   
       case 'donasi': case 'donate': {
let payment = `
*Hai Kak ${pushname}, ${sayyingTime}*`
let donate = `
donate to me so that the bot can develop more.

*e-wallet*
Pulsa: 082217590187
Dana: 082217590187
Gopay: 082217590187`
let buttons = [
    {buttonId: `rules`, buttonText: {displayText: 'Rules'}, type: 1},
    {buttonId: `menu`, buttonText: {displayText: 'Menu'}, type: 1},
    {buttonId: `owner`, buttonText: {displayText: 'Owner'}, type: 1}
]
let buttonMessage = {
    image: { url: 'https://i.ibb.co/jZc69j4/kaze.jpg' },
    caption: `${payment}`,
    footer: `${donate}\n\n${global.wm}`,
    buttons: buttons,
    headerType: 4
}
kaze.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break

case 'req': case 'request': {
	if (!text) throw `Example : ${prefix + command} Fitur Min`
   let ownernya = owner + '@s.whatsapp.net'
   let me = m.sender
   let pjtxt = `Pesan Dari : @${me.split('@')[0]} \nUntuk : @${ownernya.split('@')[0]}\n\n${command} ${text}`
   let ments = [ownernya, me]
   let buttons = [{ buttonId: 'hehehe', buttonText: { displayText: 'Thanks' }, type: 1 }]
await kaze.sendButtonText(ownernya, buttons, pjtxt, nyoutube, m, {mentions: ments, quoted: fdoc})
let akhji = `*Request Telah Terkirim*\n*Ke Owner @${ownernya.split('@')[0]}*\n_Terima Kasih🙏_`
await kaze.sendButtonText(m.chat, buttons, akhji, nyoutube, m, {mentions: ments, quoted: global.wm})
}
break

case 'delete': case 'del': {
if (!m.quoted) throw false
let { chat, fromMe, id, isBaileys } = m.quoted
if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
kaze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
}
break

case 'ceklimit': case 'checklimit': case 'limit':{
m.reply('*Your limit:* ' + (db.data.users[m.sender].limit))
}
break

case 'totalhit': case 'hit': {
m.reply(`*Total Hit: ${totalcmd}*\n*Total Hit Harian: ${jumlahharian}*`)
}
break



// Owner Menu
 case 'self': {
if (!isOwner) throw mess.owner
kaze.public = false
m.reply('Self Mode Activate')
}
break

case 'public': {
if (!isOwner) throw mess.owner
kaze.public = true
m.reply('Public Mode Activate')
}
break






 
// End Cmd
default:
if (budy.startsWith('=>')) {
    if (!isOwner) return m.reply(mess.owner)
    function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
    }
    try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
m.reply(String(e))
    }
}

if (budy.startsWith('>')) {
    if (!isOwner) return m.reply(mess.owner)
    try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
    } catch (err) {
await m.reply(String(err))
    }
}

if (budy.startsWith('$')) {
    if (!isOwner) return m.reply(mess.owner)
    exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
    })
}

if (isCmd && budy.toLowerCase() != undefined) {
    if (m.chat.endsWith('broadcast')) return
    if (m.isBaileys) return
    let msgs = global.db.data.database
    if (!(budy.toLowerCase() in msgs)) return
    kaze.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}


    } catch (err) {
m.reply(util.format(err))
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.greenBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
