let handler = async (m, { conn, text, isROwner, isOwner, command }) => {
  m.react('🙌🏻')

  // Mensaje de contacto (quoted) para respuestas
  let fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  // Asegurar estructura DB para evitar "Cannot read properties of undefined"
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.chats = global.db.data.chats || {}
  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}

  // Normalizar alias: "bienvenida" debe actuar como "setwelcome"
  const cmd = (command || '').toLowerCase()
  const isSet = cmd === 'setwelcome' || cmd === 'bienvenida'
  const isDel = cmd === 'delwelcome'

  if (isSet) {
    if (text && text.trim()) {
      global.db.data.chats[m.chat].sWelcome = text.trim()
      return conn.reply(
        m.chat,
        '𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝘼 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝘿𝘼 𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝘼𝙈𝙀𝙉𝙏𝙀 🚩',
        fkontak,
        m
      )
    }

    return conn.reply(
      m.chat,
      `𝙍𝙀𝘿𝘼𝘾𝙏𝘼 𝙀𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝘼
𝙊𝙋𝘾𝙄𝙊𝙉𝘼𝙇 𝙋𝙐𝙀𝘿𝙀 𝙐𝙎𝘼𝙍 𝙇𝙊 𝙌𝙐𝙀 𝙀𝙎𝙏𝘼 𝘾𝙊𝙉 "@" 𝙋𝘼𝙍𝘼 𝘼𝙂𝙍𝙀𝙂𝘼𝙍 𝙈𝘼́𝙎 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊́𝙉:

🚩 @𝘶𝘴𝘦𝘳 *(𝘔𝘦𝘯𝘤𝘪𝘰́𝘯 𝘢𝘭 𝘶𝘴𝘶𝘢𝘳𝘪𝘰(𝘢))*
🏳️ @𝘨𝘳𝘰𝘶𝘱 *(𝘕𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘨𝘳𝘶𝘱𝘰)*
🏴 @𝘥𝘦𝘴𝘤 *(𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪𝘰́𝙣 𝘥𝘦 𝘨𝘳𝘶𝘱𝘰)*

𝘙𝘌𝘊𝘜𝘌𝘙𝘋𝘌 𝘘𝘜𝘌 𝘓𝘖𝘚 "@" 𝘚𝘖𝘕 𝘖𝘗𝘊𝘐𝘖𝘕𝘈𝘓𝘌𝘚 ⭐`,
      m
    )
  }

  if (isDel) {
    if (global.db.data.chats[m.chat].sWelcome) {
      delete global.db.data.chats[m.chat].sWelcome
      return conn.reply(
        m.chat,
        '𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝘼 𝙍𝙀𝙀𝙎𝙏𝘼𝘽𝙇𝙀𝘾𝙄𝘿𝘼 𝘼 𝙇𝘼 𝙊𝙍𝙄𝙂𝙄𝙉𝘼𝙇 ✅',
        fkontak,
        m
      )
    }

    return conn.reply(m.chat, '𝙉𝙊 𝙃𝘼𝙔 𝙐𝙉𝘼 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝘼 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝘿𝘼 🚫', m)
  }
}

handler.help = ['setwelcome @user + texto', 'delwelcome']
handler.tags = ['group']
handler.command = ['setwelcome', 'bienvenida', 'delwelcome']
handler.botAdmin = true
handler.admin = true
handler.group = true

export default handler
