require('./config.js')

// FUNCTIONS
const {
	default:
	WaConnect,
	DisconnectReason,
	useSingleFileAuthState,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	jidDecode,
	proto
} = require("@adiwajshing/baileys")
const {
Boom
} = require('@hapi/boom')
const axios = require('axios')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const path = require('path')
const figlet = require('figlet')
const pino = require('pino')
const colors = require('colors')
const spin = require('spinnies')
const _ = require('lodash')
var FileType = require('file-type')
var PhoneNumber = require('awesome-phonenumber')

// Lib
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')
const { color } = require('./lib/color')

// LowDb
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}

// MongoDb
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

// Get Sessions 
const { state, saveState } = useSingleFileAuthState(`${global.sessionName}.json`)

// Console
const textAnimation = require('@kazesolo/text-animation');
listcolor = ['aqua','red','blue','purple','magenta']
const randomcolor = listcolor[Math.floor(Math.random() * (listcolor.length))]

// Space
spc1 = '         '
spc2 = '\n                           '
spc3 = '                   '
spc4 = '               '

const anj = `[ Created by: Kaze ]\n < =============================== >\n [•] Hai         : i.m ${global.namabot}\n [•] Bot Version : 1.0.0\n [•] Library     : Baileys MD\n [•] Status      : Online!\n [•] Owner       : ${global.namaowner}\n [•] Base Ori By : KazeDevID\n < =============================== >`
const anj2 = `─────▄██▀▀▀▀▀▀▀▀▀▀▀▀▀██▄─────
────███───────────────███────
───███─────────────────███───
──███───▄▀▀▄─────▄▀▀▄───███──
─████─▄▀────▀▄─▄▀────▀▄─████─
─████──▄████─────████▄──█████
█████─██▓▓▓██───██▓▓▓██─█████
█████─██▓█▓██───██▓█▓██─█████
█████─██▓▓▓█▀─▄─▀█▓▓▓██─█████
████▀──▀▀▀▀▀─▄█▄─▀▀▀▀▀──▀████
███─▄▀▀▀▄────███────▄▀▀▀▄─███
███──▄▀▄─█──█████──█─▄▀▄──███
███─█──█─█──█████──█─█──█─███
███─█─▀──█─▄█████▄─█──▀─█─███
███▄─▀▀▀▀──█─▀█▀─█──▀▀▀▀─▄███
████─────────────────────████
─███───▀█████████████▀───████
─███───────█─────█───────████
─████─────█───────█─────█████
───███▄──█────█────█──▄█████─
─────▀█████▄▄███▄▄█████▀─────
──────────█▄─────▄█──────────
──────────▄█─────█▄──────────
───────▄████─────████▄───────
─────▄███████───███████▄─────
───▄█████████████████████▄───
─▄███▀───███████████───▀███▄─
███▀─────███████████─────▀███
▌▌▌▌▒▒───███████████───▒▒▐▐▐▐
─────▒▒──███████████──▒▒─────
──────▒▒─███████████─▒▒──────
───────▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒───────
─────────████░░█████─────────
────────█████░░██████────────
──────███████░░███████───────
─────█████──█░░█──█████──────
─────█████──████──█████──────
──────████──████──████───────
──────████──████──████───────
──────████───██───████───────
──────████───██───████───────
──────████──████──████───────
─██────██───████───██─────██─
─██───████──████──████────██─
─███████████████████████████─
─██─────────████──────────██─
─██─────────████──────────██─
────────────████─────────────
─────────────██──────────────
`
const anj3 = `[ Created by: Kaze ]=============================== >`

// Function console gerak
var _0x333060=_0x3e3c;(function(_0x1a8de8,_0xe77ae8){var _0x54f65d=_0x3e3c,_0x254aeb=_0x1a8de8();while(!![]){try{var _0x7cab4a=-parseInt(_0x54f65d(0x8a))/0x1*(-parseInt(_0x54f65d(0x9b))/0x2)+-parseInt(_0x54f65d(0x85))/0x3+parseInt(_0x54f65d(0x84))/0x4*(-parseInt(_0x54f65d(0x8e))/0x5)+-parseInt(_0x54f65d(0x90))/0x6+-parseInt(_0x54f65d(0x86))/0x7+-parseInt(_0x54f65d(0x91))/0x8*(parseInt(_0x54f65d(0x99))/0x9)+parseInt(_0x54f65d(0x92))/0xa;if(_0x7cab4a===_0xe77ae8)break;else _0x254aeb['push'](_0x254aeb['shift']());}catch(_0x33ba51){_0x254aeb['push'](_0x254aeb['shift']());}}}(_0x37bd,0x57f0c));var spinner={'interval':0x78,'frames':['','M','Me',_0x333060(0x83),_0x333060(0x97),'Menun',_0x333060(0x8c),_0x333060(0x8b),_0x333060(0x9a),'Menunggu\x20P',_0x333060(0x89),_0x333060(0x94),_0x333060(0x9c),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..','Menunggu\x20Pesan...','Menunggu\x20Pesan..',_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..','Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),'Menunggu\x20Pesan..',_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..','Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),'Menunggu\x20Pesan..',_0x333060(0x8f),'Menunggu\x20Pesan..','Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),'Menunggu\x20Pesan..','Menunggu\x20Pesan.','Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..','Menunggu\x20Pesan...',_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),'Menunggu\x20Pesan..','Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),'Menunggu\x20Pesan..',_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),'Menunggu\x20Pesan...',_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),'Menunggu\x20Pesan.','Menunggu\x20Pesan..',_0x333060(0x93),'Menunggu\x20Pesan..','Menunggu\x20Pesan.',_0x333060(0x95),_0x333060(0x93),_0x333060(0x95),_0x333060(0x8f),_0x333060(0x95),_0x333060(0x93),'Menunggu\x20Pesan..','Menunggu\x20Pesan.',_0x333060(0x9c),_0x333060(0x94),'Menunggu\x20Pes',_0x333060(0x96),'Menunggu\x20P',_0x333060(0x87),'Menungg',_0x333060(0x8c),_0x333060(0x98),_0x333060(0x97),_0x333060(0x83),'Me','M','']};let globalSpinner;function _0x3e3c(_0x3ccff8,_0x3f88fa){var _0x37bdd9=_0x37bd();return _0x3e3c=function(_0x3e3c69,_0x1cf650){_0x3e3c69=_0x3e3c69-0x83;var _0x140643=_0x37bdd9[_0x3e3c69];return _0x140643;},_0x3e3c(_0x3ccff8,_0x3f88fa);}var getGlobalSpinner=(_0x2b0e7a=![])=>{var _0x4a8035=_0x333060;if(!globalSpinner)globalSpinner=new spin({'color':'blue','succeedColor':_0x4a8035(0x8d),'spinner':spinner,'disableSpins':_0x2b0e7a});return globalSpinner;};spins=getGlobalSpinner(![]);function _0x37bd(){var _0x5c2ecd=['2674248vlNugX','8aCJqBP','17819710scjbuj','Menunggu\x20Pesan...','Menunggu\x20Pesa','Menunggu\x20Pesan..','Menunggu\x20Pe','Menu','Menun','522531ANtwFT','Menunggu\x20','2omkPqA','Menunggu\x20Pesan','Men','28dsTzUa','914145zlnYEx','597499apJyJR','Menunggu','add','Menunggu\x20Pes','15713MlTUCl','Menungg','Menung','green','388315IyBWyR','Menunggu\x20Pesan.'];_0x37bd=function(){return _0x5c2ecd;};return _0x37bd();}var forks=(_0x1b07ae,_0x10c5d4)=>{var _0x9d9e39=_0x333060;spins[_0x9d9e39(0x88)](_0x1b07ae,{'text':_0x10c5d4});};


// Apis
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

// store
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`database/data.json`)
)

// Db
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// Save Data
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)
  
// Start
async function Starting() {
console.log(color(figlet.textSync(`${global.namabot}`, {
        font: 'Standard',
        horizontalLayout: 'default',
        vertivalLayout: 'default',
        width: 80,
        whitespaceBreak: false
        }), 'aqua')) 
console.log(color(`${anj}`,`${randomcolor}`))
console.log(color(`${anj2}`,`${randomcolor}`))

        
        
	let { version, isLatest } = await fetchLatestBaileysVersion()
    const conn = WaConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: [`${global.namabot}`,'Chrome','3.0.0'],
        auth: state,
        version
    })
    
store.bind(conn.ev)

conn.ev.on('messages.upsert', async chatUpdate => {

        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(conn, mek, store)
        require("./agam.js")(conn, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
// Group Update
    conn.ev.on('groups.update', async pea => {
    
//console.log
    try {
    for(let dani of pea) {
    // Get Profile Picture Group
       try {
       ppgc = await conn.profilePictureUrl(dani.id, 'image')
       } catch {
       ppgc = 'https://tinyurl.com/yx93l6da'
       }
       let dani_gz = { url : ppgc }
       if (dani.announce == true) {
       conn.send5ButImg(dani.id, `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`, `Group Settings Change Message`, dani_gz, [])
       } else if (dani.announce == false) {
       conn.send5ButImg(dani.id, `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`, `Group Settings Change Message`, dani_gz, [])
       } else if (dani.restrict == true) {
       conn.send5ButImg(dani.id, `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`, `Group Settings Change Message`, dani_gz, [])
       } else if (dani.restrict == false) {
       conn.send5ButImg(dani.id, `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`, `Group Settings Change Message`, dani_gz, [])
       } else {
       conn.send5ButImg(dani.id, `「 Group Settings Change 」\n\nGroup Subject telah diganti menjadi *${dani.subject}*`, `Group Settings Change Message`, dani_gz, [])
     }
    }
    } catch (err){
    console.log(err)
    }
    })

    conn.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await conn.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await conn.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://tinyurl.com/yx93l6da'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await conn.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://tinyurl.com/yx93l6da'
                }

                if (anu.action == 'add') {
                    conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Hai Kak👋 @${num.split("@")[0]}\nSelamat Datang Di Grup ${metadata.subject}\n\n*INTRO*\n- Nama:\n- Umur:\n- Askot:\n\nJangan Lupa Baca Deskripsi Ya Kak` })
                } else if (anu.action == 'remove') {
                    conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Selamat Tinggal👋 @${num.split("@")[0]}\nKeluar Dari Grup ${metadata.subject}\n\nKalo Balik Lagi Bawa Gorengan Yo:v` })
                } else if (anu.action == 'promote') {
                    conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Promote From ${metadata.subject}` })
                } else if (anu.action == 'demote') {
                    conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Demote From ${metadata.subject}` })
              }
            }
        } catch (err) {
            console.log(err)
        }
    })
	
    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    conn.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = conn.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    conn.getName = (jid, withoutContact  = false) => {
        id = conn.decodeJid(jid)
        withoutContact = conn.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === conn.decodeJid(conn.user.id) ?
            conn.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await conn.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${await conn.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	conn.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    conn.setStatus = (status) => {
        conn.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
	
    conn.public = true

    conn.serializeM = (m) => smsg(conn, m, store)

    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); conn.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); Starting(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); Starting(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); conn.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); conn.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); Starting(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); Starting(); }
            else conn.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
        textAnimation.rainbow(anj3);
        forks('2',colors.bold.white(global.Log)); 
    })

    conn.ev.on('creds.update', saveState)

    // Add Other
      
      /** Resize Image
      *
      * @param {Buffer} Buffer (Only Image)
      * @param {Numeric} Width
      * @param {Numeric} Height
      */
      conn.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      }      
      
      /** Send Button 5 Location
       *
       * @param {*} jid
       * @param {*} text
       * @param {*} footer
       * @param {*} location
       * @param [*] button
       * @param {*} options
       */
      conn.send5ButLoc = async (jid , text = '' , footer = '', lok, but = [], options = {}) =>{
       let resize = await conn.reSize(lok, 300, 150)
       var template = generateWAMessageFromContent(jid, {
       "templateMessage": {
       "hydratedTemplate": {
       "locationMessage": {
       "degreesLatitude": 0,
       "degreesLongitude": 0,
       "jpegThumbnail": resize
       },
       "hydratedContentText": text,
       "hydratedFooterText": footer,
       "hydratedButtons": but
       }
       }
       }, options)
       conn.relayMessage(jid, template.message, { messageId: template.key.id })
      }

      /**
      *
      * @param {*} jid
      * @param {*} url
      * @param {*} caption
      * @param {*} quoted
      * @param {*} options
      */
     conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }

    /** Send List Messaage
      *
      *@param {*} jid
      *@param {*} text
      *@param {*} footer
      *@param {*} title
      *@param {*} butText
      *@param [*] sections
      *@param {*} quoted
      */
        conn.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        conn.sendMessage(jid, listMes, { quoted: quoted })
        }

    /** Send Button 5 Message
     * 
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} button
     * @returns 
     */
        conn.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        conn.sendMessage(jid, templateMessage)
        }

    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    conn.send5ButImg = async (jid , text = '' , footer = '', img, but = [], buff, options = {}) =>{
        let resize = await conn.reSize(buff, 300, 150)
        let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: resize }, { upload: conn.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            conn.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    conn.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], buff, options = {}) =>{
        let resize = await conn.reSize(buff, 300, 150)
        let message = await prepareWAMessageMedia({ video: vid, jpegThumbnail: resize }, { upload: conn.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            conn.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    conn.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], buff, options = {}) =>{
        let resize = await conn.reSize(buff, 300, 150)
        let a = [1,2]
        let b = a[Math.floor(Math.random() * a.length)]
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true, jpegThumbnail: resize, gifAttribution: b}, { upload: conn.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            conn.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        conn.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await conn.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    conn.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await conn.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    conn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await conn.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await conn.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await conn.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === conn.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    conn.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)        
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    return conn
}

Starting()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.greenBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
