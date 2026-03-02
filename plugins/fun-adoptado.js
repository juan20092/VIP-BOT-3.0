let handler = async (m, { conn }) => {
  const mentioned = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : m.sender
  const name = conn.getName ? await conn.getName(mentioned) : (mentioned.split('@')[0] || 'user')
  const userTag = mentioned.split('@')[0]

  // Mención REAL: @userTag debe existir en el texto
  // El nombre es solo decorativo
  const msg = `*@${userTag}* (${name}) *ADOPTADO* _Sus padres se fueron x pañales 😞😂_`

  await conn.sendMessage(
    m.chat,
    { text: msg, mentions: [mentioned] },
    { quoted: m }
  )
}

handler.help = ['adoptado @usuario']
handler.tags = ['diversión']
handler.command = ['adoptado']

export default handler
