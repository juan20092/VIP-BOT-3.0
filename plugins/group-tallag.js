const handler = async (m, { isOwner, isAdmin, conn, args, participants }) => {
  try {
    // Verificar permisos
    if (!isAdmin && !isOwner) {
      return m.reply('❌ Solo administradores pueden usar este comando.');
    }

    // Obtener texto
    const pesan = args.join(' ').trim();

    // Obtener metadata del grupo
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupName = groupMetadata.subject || 'Grupo';
    const total = participants.length;

    // Reacción
    await conn.sendMessage(m.chat, {
      react: {
        text: '🔪',
        key: m.key
      }
    });

    // Construir texto
    let mentionText = `
┏━━━━━━━━━━━┓
┃ 🛸 𝙶𝚁𝚄𝙿𝙾: ${groupName}
┃ 👥 𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂: ${total}
┗━━━━━━━━━━━┛
`.trim();

    if (pesan) {
      mentionText += `\n\n📢 ${pesan}`;
    }

    mentionText += `\n\n┌──⭓ *Despierten*`;

    // Lista de menciones
    mentionText += '\n' + participants
      .map(mem => `🍷 @${mem.id.split('@')[0]}`)
      .join('\n');

    mentionText += `\n└───────⭓

𝘚𝘶𝘱𝘦𝘳 𝘉𝘰𝘵 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 🔪`;

    // Enviar mensaje
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: 'https://cdn.dix.lat/me/b06e63d2-bc0b-4c85-9f7a-eef09fc64f64.jpg'
        },
        caption: mentionText,
        mentions: participants.map(p => p.id)
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al ejecutar el comando.');
  }
};

handler.customPrefix = /^\.?todos$/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;

export default handler;
