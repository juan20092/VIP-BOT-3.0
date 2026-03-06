let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🔪 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢𝘭 𝘮𝘦𝘯𝘴𝘢𝘫𝘦 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘳`, m, rcanal)
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
