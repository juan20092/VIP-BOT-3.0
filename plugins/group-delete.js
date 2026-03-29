let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `> ➤『 𝗥𝗲𝘀𝗽𝗼𝗻𝗱𝗲 𝗮𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲 𝗾𝘂𝗲 𝗱𝗲𝘀𝗲𝗮𝘀 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 』`, m, rcanal)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
 } catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^del(ete)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
