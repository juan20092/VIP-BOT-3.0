import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync} from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata}) {
    if (!m.messageStubType ||!m.isGroup) return

    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "AlienMenu"
},
        message: {
            locationMessage: {
                name: "*𝔙𝔦𝔭 𝔅𝔬𝔱 🔪*",
                jpegThumbnail: await (await fetch('https://files.catbox.moe/gx1ipj.jpg')).buffer(),
                vcard:
                    "BEGIN:VCARD\n" +
                    "VERSION:3.0\n" +
                    "N:;Ultra bot;;;\n" +
                    "FN:Ultra bot\n" +
                    "ORG:Juan Developers\n" +
                    "TITLE:\n" +
                    "item1.TEL;waid=19709001746:+1 (970) 900-1746\n" +
                    "item1.X-ABLabel:Alien\n" +
                    "X-WA-BIZ-DESCRIPTION:🧨 Llamado grupal universal con estilo.\n" +
                    "X-WA-BIZ-NAME:Ultra bot\n" +
                    "END:VCARD"
}
},
        participant: "0@s.whatsapp.net"
}

    let chat = global.db.data.chats[m.chat]
    let usuario = `@${m.sender.split`@`[0]}`
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/gx1ipj.jpg'

    let nombre = `${usuario} *𝐇𝐀 𝐂𝐀𝐌𝐁𝐈𝐀𝐃𝐎 𝐄𝐋 𝐍𝐎𝐌𝐁𝐑𝐄 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎*\n\n> 🧨 *𝐍𝐔𝐄𝐕𝐎 𝐍𝐎𝐌𝐁𝐑𝐄:* _${m.messageStubParameters[0]}_`
    let foto = `📸*¡Nᴜᴇᴠᴀ ꜰᴏᴛᴏ ᴅᴇ ɢʀᴜᴘᴏ!*\n\n> 🧨 𝗔𝗖𝗖𝗜𝗢𝗡 𝗛𝗘𝗖𝗛𝗔 𝗣𝗢𝗥: ${usuario}`
    let edit = `🛠 ${usuario} 𝗛𝗔 𝗔𝗝𝗨𝗦𝗧𝗔𝗗𝗢 𝗟𝗔 𝗖𝗢𝗡𝗙𝗜𝗚𝗨𝗥𝗔𝗖𝗜𝗢𝗡 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢\n\n> 🔒 Aʜᴏʀᴀ *${m.messageStubParameters[0] == 'on'? 'sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs': 'todos'}* ᴘᴜᴇᴅᴇɴ ᴄᴏɴꜰɪɢᴜʀᴀʀ ᴇʟ ɢʀᴜᴘᴏ.`
    let newlink = `*¡El enlace del grupo ha sido restablecido!* 🔗\n\n> 🧨 𝗔𝗖𝗖𝗜𝗢𝗡 𝗛𝗘𝗖𝗛𝗔 𝗣𝗢𝗥: ${usuario}`
    let status = `🗣️ 𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 𝗛𝗔 𝗦𝗜𝗗𝗢 *${m.messageStubParameters[0] == 'on'? '𝗖𝗘𝗥𝗥𝗔𝗗𝗢': '𝗔𝗕𝗜𝗘𝗥𝗧𝗢'}* 𝗣𝗢𝗥 ${usuario}!\n\n> 🔪 𝗔𝗛𝗢𝗥𝗔 ${m.messageStubParameters[0] == 'on'? '𝗦𝗢𝗟𝗢 𝗟𝗢𝗦 𝗔𝗗𝗠𝗜𝗡𝗦': '𝗧𝗢𝗗𝗢𝗦'} 𝗣𝗨𝗘𝗗𝗘𝗡 𝗘𝗡𝗩𝗜𝗔𝗥 𝗠𝗘𝗡𝗦𝗔𝗝𝗘𝗦`
    let admingp = `@${m.messageStubParameters[0].split`@`[0]} *! 𝗔𝗛𝗢𝗥𝗔 𝗘𝗦 𝗔𝗗𝗠𝗜𝗡 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 !*\n\n> 🧨 𝗔𝗖𝗖𝗜𝗢𝗡 𝗛𝗘𝗖𝗛𝗔 𝗣𝗢𝗥: ${usuario}`
    let noadmingp = `@${m.messageStubParameters[0].split`@`[0]} *! 𝗛𝗔 𝗗𝗘𝗝𝗔𝗗𝗢 𝗗𝗘 𝗦𝗘𝗥 𝗔𝗗𝗠𝗜𝗡𝗦 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 !*\n\n> 🧨 𝗔𝗖𝗖𝗜𝗢𝗡 𝗛𝗘𝗖𝗛𝗔 𝗣𝗢𝗥: ${usuario}`

    if (chat.detect && m.messageStubType == 21) {
        await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 22) {
        await this.sendMessage(m.chat, { image: { url: pp}, caption: foto, mentions: [m.sender]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 23) {
        await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 25) {
        await this.sendMessage(m.chat, { text: edit, mentions: [m.sender]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 26) {
        await this.sendMessage(m.chat, { text: status, mentions: [m.sender]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 29) {
        await this.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`]}, { quoted: fkontak})
} else if (chat.detect && m.messageStubType == 30) {
await this.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`]}, { quoted: fkontak})
} else {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType],
})
}
}

export default handler
