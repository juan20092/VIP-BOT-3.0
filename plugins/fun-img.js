import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, args, conn }) => {
  if (!text) {
    return m.reply(`🔍 Por favor, dime qué imágenes deseas buscar en *Google*.\n\n📌 Ejemplo: ${usedPrefix}googleimg gatos tiernos`)
  }

  const query = encodeURIComponent(text.trim())
  const maxResults = Math.min(Number(args[1]) || 5, 10) // máximo 10 imágenes
  const apiUrl = `https://api.delirius.store/search/gimage?query=${query}`

  try {
    await m.react('🕒')
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!Array.isArray(json.data) || json.data.length === 0) {
      await m.react('❌')
      return m.reply('😕 No se encontraron imágenes para tu búsqueda.')
    }

    // Enviar cada imagen directamente
    for (let item of json.data.slice(0, maxResults)) {
      if (item.url) {
        await conn.sendMessage(m.chat, { image: { url: item.url }, caption: `🖼️ Resultado para: ${text}` }, { quoted: m })
      }
    }

    await m.react('✅')
  } catch (err) {
    await m.react('⚠️')
    m.reply(`🚨 Ocurrió un error al realizar la búsqueda de imágenes.\n> Usa *${usedPrefix}report* para informarlo.\n\n🧾 Detalle: ${err.message}`)
  }
}

handler.help = ['googleimg']
handler.command = ['googleimg']
handler.tags = ['internet']
handler.group = false

export default handler
