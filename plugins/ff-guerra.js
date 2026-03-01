let handler = async (m, { conn, participants, groupMetadata}) => {
  const pp = 'https://cdn.russellxz.click/16b3faeb.jpeg' // Imagen de portada visual directa
  const groupAdmins = participants.filter(p => p.admin)
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

  const text = `
╭──────>⋆☽⋆ ⋆☾⋆<──────╮
   ㅤ   *GUERRA DE CLANES*
        ${groupMetadata.subject}
╰──────>⋆☽⋆ ⋆☾⋆<──────╯

╭──── ❍ *INFORMACIÓN* ❍ ────╮
│⏱ *Horario:*
│🇲🇽 MÉXICO: [Horario]
│🇨🇴 COLOMBIA: [Horario]
│
│👥 *Jugadores:*
│➤ Confirmación vía comando
╰───────────────────────────╯

╭──── ❍ *ESCUADRAS* ❍ ────╮
│🥷 *Escuadra ➹1*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│
│🥷 *Escuadra ➹2*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│
│🥷 *Escuadra ➹3*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│
│🥷 *Escuadra ➹4*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│
│🥷 *Escuadra ➹5*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│
│🥷 *Escuadra ➹6*
│   👑 •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
╰─────────────────────────╯

╭──── ❍ *SUPLENTES* ❍ ────╮
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
│   ⚜️ •
╰─────────────────────────╯
`.trim()

  await conn.sendFile(
    m.chat,
    pp,
    'guerra.jpg',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner]}
)
}

handler.help = ['guerradeclanes']
handler.command = /^(guerra|guerradeclanes)$/i
handler.group = true

export default handler;
