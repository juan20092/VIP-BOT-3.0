import { xpRange } from '../lib/levelling.js'
import axios from 'axios'

const clockString = ms => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const saludarSegunHora = () => {
  const hora = new Date().getHours()
  if (hora >= 5 && hora < 12) return '🌅 Buenos días'
  if (hora >= 12 && hora < 19) return '☀️ Buenas tardes'
  return '🌙 Buenas noches'
}

const imgvip = 'https://files.catbox.moe/gx1ipj.jpg'

// 🔥 Random prototype
Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)]
}

const handler = async (m, { conn, usedPrefix }) => {
  try {

    const saludo = saludarSegunHora()
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5 }
    const { exp, level, limit } = user
    const { min, xp } = xpRange(level, global.multiplier || 1)
    const totalUsers = Object.keys(global.db.data.users).length
    const mode = global.opts?.self ? 'Privado 🔒' : 'Público 🌍'
    const uptime = clockString(process.uptime() * 1000)
    const tagUsuario = `@${m.sender.split('@')[0]}`
    const userName = (await conn.getName?.(m.sender)) || tagUsuario

    // 🧠 AD TEXT RANDOM
    const adText = ["𝐕𝐈𝐏 𝐁𝐎𝐓"].getRandom()

    // 🖼️ Thumbnail buffer
    let thumbnailBuffer
    try {
      const response = await axios.get(imgvip, { responseType: 'arraybuffer' })
      thumbnailBuffer = Buffer.from(response.data)
    } catch {
      thumbnailBuffer = Buffer.alloc(0)
    }

    // 📇 Fake contacto premium
    const fkontak = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "VIP BOT" },
      message: {
        locationMessage: {
          name: adText,
          jpegThumbnail: thumbnailBuffer,
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;juan;;;\nFN:Eliud\nORG:Vipbot\nEND:VCARD"
        }
      },
      participant: "0@s.whatsapp.net"
    }

    // 📂 Recolectar comandos
    let categorizedCommands = {}

    Object.values(global.plugins)
      .filter(p => p?.help && !p.disabled)
      .forEach(p => {
        const tag = (Array.isArray(p.tags) ? p.tags[0] : p.tags || 'otros').toLowerCase()
        const cmds = Array.isArray(p.help) ? p.help : [p.help]

        if (!categorizedCommands[tag]) categorizedCommands[tag] = []

        cmds.forEach(cmd => {
          categorizedCommands[tag].push(`${usedPrefix}${cmd}`)
        })
      })

    const categoryConfig = {
      anime: '🌸 ANIME',
      info: '📢 INFORMACIÓN',
      search: '🔍 BÚSQUEDAS',
      diversión: '🎉 DIVERSIÓN',
      subbots: '🤖 SUBBOTS',
      rpg: '⚔️ RPG',
      registro: '📝 REGISTRO',
      sticker: '🎨 STICKERS',
      imagen: '🖼️ IMÁGENES',
      logo: '🖋️ LOGOS',
      premium: '💎 PREMIUM',
      configuración: '⚙️ CONFIGURACIÓN',
      descargas: '📥 DESCARGAS',
      herramientas: '🛠️ HERRAMIENTAS',
      nsfw: '🔞 NSFW',
      audios: '🎧 AUDIOS',
      freefire: '🔥 FREE FIRE',
      otros: '🧩 OTROS'
    }

    const menuBody = Object.keys(categorizedCommands)
      .sort()
      .map(category => {
        const title = categoryConfig[category] || `✨ ${category.toUpperCase()}`
        const commandsList = categorizedCommands[category]
          .sort()
          .map(cmd => `│ ➜ ${cmd}`)
          .join('\n')

        return `
╭━━━〔 ${title} 〕━━━⬣
${commandsList}
╰━━━━━━━━━━━━━━━━⬣`
      })
      .join('\n')

    const header = `
╔════════════════════════╗
║   ${saludo}
║   👤 Usuario: ${userName}
╠════════════════════════╣
║ 📊 Nivel: ${level}
║ ✨ Exp: ${exp - min}/${xp}
║ 🎟️ Límite: ${limit}
║ ⏳ Activo: ${uptime}
║ 👥 Usuarios: ${totalUsers}
║ 🌐 Modo: ${mode}
╚════════════════════════╝
`

    const footer = `
╔════════════════════════╗
║   ❤️ VIP BOT
║   🚀 Sistema Premium
║   ⭐ Versión 3.0
╚════════════════════════╝
`

    const fullMenu = `${header}\n${menuBody}\n${footer}`

    await conn.sendMessage(m.chat, {
      image: { url: imgvip },
      caption: fullMenu,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '⚠️ Error al cargar el menú.', m)
  }
}

handler.command = ['menu', 'help', 'menú']
export default handler
