import fetch from 'node-fetch'
import yts from 'yt-search'

const APIKEY = 'NEX-84A545EA503045EABFE70480' // <-- tu key

let handler = async (m, { conn, text, args }) => {
  try {
    const query = (text || args.join(' ')).trim()
    if (!query) return m.reply('🍃 Ingresa el texto de lo que quieres buscar')

    const ytres = await search(query)
    if (!ytres.length) return m.reply('🍃 No se encontraron resultados para tu búsqueda.')

    const izumi = ytres[0]

    const info = `🎬 *Título*: ${izumi.title}
⏱️ *Duración*: ${izumi.timestamp || '??:??'}
📅 *Publicado*: ${izumi.ago || 'Desconocido'}
📺 *Canal*: ${izumi.author?.name || izumi.author || 'Desconocido'}
🔗 *Url*: ${izumi.url}`

    await conn.sendFile(m.chat, izumi.image, 'thumbnail.jpg', info, m)

    // ID / URL normalizada
    const videoId = extractVideoId(izumi.url)
    if (!videoId) throw new Error('No pude obtener el ID del video.')

    const youtubeUrl = `https://youtu.be/${videoId}`

    // NUEVO endpoint
    const apiUrl =
      'https://nex-magical.vercel.app/download/audio?url=' +
      encodeURIComponent(youtubeUrl) +
      '&apikey=' +
      encodeURIComponent(APIKEY)

    const response = await fetch(apiUrl, {
      headers: { accept: 'application/json' }
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new Error(`API respondió HTTP ${response.status}${body ? `: ${body}` : ''}`)
    }

    const data = await response.json()

    // Según tu JSON de ejemplo:
    // data.status === true
    // data.result.status === true
    // data.result.url => link directo al mp3
    const ok = data?.status === true && data?.result?.status === true
    const audioUrl = data?.result?.url

    if (!ok || !audioUrl) {
      throw new Error('Fallo al obtener el audio. JSON inesperado.')
    }

    // El title puede venir null en result.info.title, así que hacemos fallback
    const title =
      data?.result?.info?.title ||
      data?.result?.title ||
      izumi.title ||
      'audio'

    const safeTitle = String(title).replace(/[\\/:*?"<>|]+/g, '').trim()

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${safeTitle}.mp3`
      },
      { quoted: m }
    )
  } catch (error) {
    console.error(error)
    m.reply(`❌ Lo siento, no pude descargar el audio.\n${error.message}`)
  }
}

handler.command = /^(play)$/i
export default handler

async function search(query, options = {}) {
  const result = await yts({ query, hl: 'es', gl: 'ES', ...options })
  return result?.videos || []
}

function extractVideoId(url = '') {
  const vParam = url.match(/[?&]v=([^&]+)/)
  if (vParam?.[1]) return vParam[1]

  const short = url.match(/youtu\.be\/([^?&/]+)/)
  if (short?.[1]) return short[1]

  const shorts = url.match(/shorts\/([^?&/]+)/)
  if (shorts?.[1]) return shorts[1]

  const parts = url.split('/').filter(Boolean)
  return parts.length ? parts[parts.length - 1].split('?')[0] : null
}
