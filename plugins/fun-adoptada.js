let handler = async (m, { conn, text }) => {
  const mentioned =
    (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : null

  if (!mentioned) {
    return conn.sendMessage(
      m.chat,
      { text: "Por favor, menciona a un usuario. Ejemplo: .adoptada @usuario" },
      { quoted: m }
    )
  }

  const userTag = mentioned.split("@")[0]

  let name = userTag
  try {
    name = conn.getName ? await conn.getName(mentioned) : userTag
  } catch {
    name = userTag
  }

  // IMPORTANTE: el @tag debe estar en el texto para que la mención funcione bien
  const msg = `*(@${userTag})* *${name}* *ADOPTADA* _Sus padres se fueron x pañales 😞😂_`

  await conn.sendMessage(
    m.chat,
    { text: msg, mentions: [mentioned] },
    { quoted: m }
  )
}

handler.help = ["adoptada @usuario"]
handler.tags = ["diversión"]
handler.command = ["adoptada"]

export default handler
